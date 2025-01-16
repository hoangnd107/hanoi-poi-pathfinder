-- Lọc dữ liệu: Việt Nam -> Hà Nội
-- Khảo sát dữ liệu
SELECT * FROM gadm41_vnm_0 LIMIT 10;

SELECT * FROM gadm41_vnm_1 LIMIT 10;

SELECT name_1, name_2 FROM gadm41_vnm_2 WHERE name_1 = 'Hà Nội' LIMIT 10;

SELECT name_1, name_2, name_3 FROM gadm41_vnm_3 WHERE name_1 = 'Hà Nội';

SELECT * FROM gis_osm_pois_free_1 LIMIT 10;

SELECT * FROM gis_osm_roads_free_1 LIMIT 10;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'gadm41_vnm_0'
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'gadm41_vnm_1'
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'gadm41_vnm_2'
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'gadm41_vnm_3'
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'gis_osm_pois_free_1'
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'gis_osm_roads_free_1'
ORDER BY ordinal_position;

-- Tạo bảng quận huyện tại Hà Nội từ gadm41_vnm_2
CREATE TABLE hanoi_district AS
SELECT *
FROM gadm41_vnm_2
WHERE name_1 = 'Hà Nội';
ALTER TABLE hanoi_district ADD PRIMARY KEY (gid);

-- Tạo bảng phường xã thị trấn tại Hà Nội từ gadm41_vnm_3
CREATE TABLE hanoi_ward AS
SELECT *
FROM gadm41_vnm_3
WHERE name_1 = 'Hà Nội';
ALTER TABLE hanoi_ward ADD PRIMARY KEY (gid);


-- Tạo bảng địa điểm tại Hà Nội từ gis_osm_pois_free_1
CREATE TABLE hanoi_pois AS
SELECT *
FROM gis_osm_pois_free_1
WHERE ST_Within(geom, 
                (SELECT geom 
                 FROM gadm41_vnm_1 
                 WHERE name_1 = 'Hà Nội'))
      AND gis_osm_pois_free_1.name IS NOT NULL;
ALTER TABLE hanoi_pois ADD PRIMARY KEY (gid);

-- Tạo bảng đường tại Hà Nội từ gis_osm_roads_free_1
CREATE TABLE hanoi_roads_1 AS
SELECT *
FROM gis_osm_roads_free_1
WHERE ST_Within(geom, 
                (SELECT geom 
                 FROM gadm41_vnm_1 
                 WHERE name_1 = 'Hà Nội'));
ALTER TABLE hanoi_roads_1 ADD PRIMARY KEY (gid);
