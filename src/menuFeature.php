<link rel="stylesheet" href="public/assets/css/menuFeature.css">
<script src="public/assets/js/menuFeature.js"></script>
<div class="btn-toggle-sidebar" id="btn-toggle-sidebar" onclick="toggleMenuFeature()">
    ☰
</div>
<div class="sidebar" id="sidebar">
    <div class="sidebar-content" id="sidebar-content">
        <select class="select-lv1" id="select-lv1">
            <option value="" disabled selected>Chọn loại 1</option>
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
        </select>
        <select class="select-lv2" id="select-lv2">
            <option value="" disabled selected>Chọn loại 2</option>
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
        </select>
        <select class="select-district" id="select-district">
            <option value="" disabled selected>Chọn Quận/Huyện</option>
        </select>
        <input class="select-radius" id="select-radius" type="number" placeholder="Khoảng cách bán kính (km)" />
        <div class="sidebar-btns" id="sidebar-btns">
            <button class="btn-reset" id="btn-reset" onclick="handleReset()">Reset</button>
            <button class="btn-search" id="btn-search" onclick="handleSearch()">Tìm</button>
        </div>
        <p class="result-text" id="result-text">Kết quả tìm được: </p>
    </div>
</div>