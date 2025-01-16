CREATE EXTENSION postgis;
CREATE EXTENSION pgrouting;

ALTER TABLE public.hanoi_roads ADD COLUMN source INTEGER;
ALTER TABLE public.hanoi_roads ADD COLUMN target INTEGER;

SELECT pgr_createTopology('public.hanoi_roads', 0.0001, 'geom', 'gid');

CREATE OR REPLACE FUNCTION pgr_fromAtoB(
    IN tbl varchar,
    IN x1 double precision,
    IN y1 double precision,
    IN x2 double precision,
    IN y2 double precision,
    OUT seq integer,
    OUT gid integer,
    OUT name text,
    OUT heading double precision,
    OUT cost double precision,
    OUT geom geometry
)
RETURNS SETOF record AS
$BODY$
DECLARE
    source integer;
    target integer;
    sql text;
    rec record;
BEGIN
    EXECUTE format(
        'SELECT id FROM hanoi_roads_vertices_pgr
         ORDER BY the_geom <-> ST_SetSRID(ST_Point(%s, %s), 4326) LIMIT 1',
        x1, y1
    ) INTO source;

    EXECUTE format(
        'SELECT id FROM hanoi_roads_vertices_pgr
         ORDER BY the_geom <-> ST_SetSRID(ST_Point(%s, %s), 4326) LIMIT 1',
        x2, y2
    ) INTO target;

    sql := format(
        'SELECT d.seq, r.gid, r.name, d.cost, r.geom, r.source, r.target,
        ST_Reverse(r.geom) AS flip_geom
        FROM pgr_dijkstra(
            $$SELECT gid AS id, source, target, ST_Length(geom) AS cost
            FROM %I$$,
            %s, %s, false
        ) d
        JOIN %I r ON d.edge = r.gid
        ORDER BY d.seq',
        tbl, source, target, tbl
    );

    FOR rec IN EXECUTE sql LOOP
        IF rec.source != source THEN
            rec.geom := rec.flip_geom;
        END IF;
		
		IF rec.geom IS NOT NULL THEN
		    EXECUTE format(
		        'SELECT degrees(ST_Azimuth(
		            ST_StartPoint(%L),
		            ST_EndPoint(%L)
		        ))',
		        rec.geom::text, rec.geom::text
		    ) INTO heading;
		ELSE
		    heading := NULL;
		END IF;

        -- Trả về kết quả
        seq := rec.seq;
        gid := rec.gid;
        name := rec.name;
        cost := rec.cost;
        geom := rec.geom;

        RETURN NEXT;
    END LOOP;

    RETURN;
END;
$BODY$
LANGUAGE plpgsql VOLATILE STRICT;