<link rel="stylesheet" href="<?= BASE_ASSETS_URL ?>/css/menuFeature.css">
<script src="<?= BASE_ASSETS_URL ?>/js/menuFeature.js"></script>
<div class="menuFeature_toggle" onclick="toggleMenuFeature()">
    ☰
</div>
<div class="sidebar" id="sidebar">
    <div class="sidebar_content">
        <select>
            <option value="" disabled selected>Chọn loại 1</option>
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
        </select>
        <select>
            <option value="" disabled selected>Chọn loại 2</option>
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
        </select>
        <select>
            <option value="" disabled selected>Chọn vùng</option>
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
        </select>
        <input type="number" placeholder="Khoảng cách" />
        <div class="sidebar_buttons">
            <button class="reset_btn">Reset</button>
            <button class="search_btn" onclick="alert('Chức năng đang phát triển')">Tìm</button>
        </div>
        <p>Kết quả tìm được: </p>
    </div>
</div>