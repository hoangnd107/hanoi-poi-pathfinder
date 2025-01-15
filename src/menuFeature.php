<div class="btn-toggle-sidebar" id="btn-toggle-sidebar" onclick="toggleMenuFeature()">
    ☰
</div>
<div class="sidebar" id="sidebar">
    <div class="sidebar-content" id="sidebar-content">
        <!-- <select class="select-lv1" id="select-lv1">
            <option value="" disabled selected>Chọn loại 1</option>
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
        </select> -->
        <select class="select-lv2" id="select-lv2">
            <option value="all">Tất cả</option>
            <option value="cafe">Cà Phê</option>
            <option value="food_court">Khu ẩm thực</option>
            <option value="bar">Quán Bar</option>
            <option value="biergarten">Quán bia</option>
            <option value="pub">Quán rượu</option>
            <option value="restaurant">Nhà hàng</option>
            <option value="fast_food">Quán ăn nhanh</option>
        </select>
        <div>
            <h4>Chọn tuyến đường</h4>
            <button id='btn-show-road' onclick="showRoad()">Click</button>
        </div>
        <select class="select-district" id="select-district">
            <option value="" disabled selected>Chọn Quận/Huyện</option>
        </select>
        <input class="select-radius" id="select-radius" type="number" placeholder="Khoảng cách bán kính (km)" />
        <div class="sidebar-btns" id="sidebar-btns">
            <button class="btn-reset" id="btn-reset" onclick="handleReset()">Reset</button>
            <!-- <button class="btn-search" id="btn-search" onclick="handleSearch()">Tìm</button> -->
            <button class="btn-search" id="btn-search" onclick="showAllPoints()">Tìm</button>
        </div>
        <p class="result-text" id="result-text">Kết quả tìm được: </p>
    </div>
</div>