function toggleMenuFeature() {
    const sidebar = document.getElementById('sidebar');
    const map = document.getElementById('map');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        map.classList.remove('shift');
    } else {
        sidebar.classList.add('open');
        map.classList.add('shift');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.querySelector('.reset_btn');
    const sidebar = document.querySelector('.sidebar_content');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            const selects = sidebar.querySelectorAll('select');
            selects.forEach(select => {
                select.selectedIndex = 0;
            });
            const inputs = sidebar.querySelectorAll('input[type="number"]');
            inputs.forEach(input => {
                input.value = '';
            });
            const resultText = sidebar.querySelector('p');
            if (resultText) {
                resultText.textContent = 'Kết quả tìm được: ';
            }
        });
    }
});