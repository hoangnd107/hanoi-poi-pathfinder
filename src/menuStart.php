<link rel="stylesheet" href="<?= BASE_ASSETS_URL ?>/css/menuStart.css">
<script src="<?= BASE_ASSETS_URL ?>/js/menuStart.js"></script>
<div class="menuStart_container">
    <button class="menuStart_button" onclick="toggleMenuStart()">+</button>
    <div class="menuStart_content" id="menuStart_content">
        <button onclick="startSelectLocation()">Chọn ví trí trên map</button>
        <button onclick="showCurrentLocation()">Lấy vị trí hiện tại</button>
    </div>
</div>