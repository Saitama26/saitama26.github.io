// Получаем все изображения на странице
const allImages = document.querySelectorAll('.logo');

// Добавляем обработчик клика ко всем изображениям
allImages.forEach(img => {
    img.addEventListener('click', function() {
        location.reload();
    });
});