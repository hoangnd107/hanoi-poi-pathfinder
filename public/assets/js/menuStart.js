function toggleMenuStart() {
    const menuStart = document.getElementById('menuStart_content');
    if (menuStart.classList.contains('show')) {
        menuStart.classList.remove('show');
        menuStart.classList.add('hide');
        setTimeout(() => {
            menuStart.style.display = 'none';
        }, 300);
    } else {
        menuStart.style.display = 'block';
        menuStart.classList.remove('hide');
        menuStart.classList.add('show');
    }
}
// Đóng menu khi click ra ngoài
document.addEventListener('click', function (event) {
    const menuStart = document.getElementById('menuStart_content');
    const menuStartButton = document.querySelector('.menuStart_button');
    if (!menuStart.contains(event.target) && event.target !== menuStartButton) {
        if (menuStart.classList.contains('show')) {
            toggleMenuStart();
        }
    }
});