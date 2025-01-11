<?php include 'src/baseURL.php'; ?>
<link rel="stylesheet" href="<?= $baseURL ?>/css/menuStart.css">
<script src="<?= $baseURL ?>/js/menuStart.js"></script>
<div class="menuStart_container">
    <button class="menuStart_button" onclick="toggleMenuStart()">+</button>
    <div class="menuStart_content" id="menuStart_content">
        <button onclick="alert('Chức năng đang phát triển')">Chọn ví trí trên map</button>
        <button onclick="alert('Chức năng đang phát triển')">Lấy vị trí hiện tại</button>
    </div>
</div>