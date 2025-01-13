<link rel="stylesheet" href="public/assets/css/menuStart.css">
<script src="public/assets/js/menuStart.js"></script>
<div class="add-location-container" id="add-location-container">
    <button class="btn-add-location" id="btn-add-location" onclick="toggleMenuStart()">+</button>
    <div class="add-location-content" id="add-location-content">
        <button class="btn-current-location" id="btn-current-location"
            onclick="startSelectLocation()">Lấy vị trí hiện tại</button>
        <button class="btn-select-location" id="btn-select-location"
            onclick="showCurrentLocation()">Chọn vị trí trên map</button>
    </div>
</div>