<div class="btn-toggle-sidebar" id="btn-toggle-sidebar" onclick="toggleMenuFeature()">☰</div>

<div class="sidebar" id="sidebar">
    <div class="sidebar-content" id="sidebar-content">
        
        <select class="select-lv2" id="select-lv2">
            <option value="all">Tất cả</option>
            <option value="cafe">Cà phê</option>
            <option value="food_court">Khu ẩm thực</option>
            <option value="bar">Quán bar</option>
            <option value="biergarten">Quán bia</option>
            <option value="pub">Quán rượu</option>
            <option value="restaurant">Nhà hàng</option>
            <option value="fast_food">Quán ăn nhanh</option>
        </select>

        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
            <p style="margin: 0;">Tìm theo tuyến đường</p>
            <button id='btn-show-road' onclick="showRoad()" style="padding: 10px;">Lộ trình</button>
        </div>

        <select class="select-district" id="select-district">
            <option value="" disabled selected>Chọn Quận/Huyện</option>
        </select>

        <input class="select-radius" id="select-radius" type="number" placeholder="Khoảng cách bán kính (km)" />

        <div class="sidebar-btns" id="sidebar-btns">
            <button class="btn-reset" id="btn-reset" onclick="handleReset()">Đặt lại</button>
            <button class="btn-search" id="btn-search" onclick="showAllPoints()">Tìm</button>
        </div>
    </div>
</div>