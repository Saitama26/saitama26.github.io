document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".functional__item");
    let index = 0;

    function sequentialBounce() {
        bounceAnimation(items[index]);

        index = (index + 1) % items.length; // Переход к следующему элементу
        setTimeout(sequentialBounce, 500); // Интервал 3 секунды между прыжками
    }

    sequentialBounce(); // Запуск анимации
});

function bounceAnimation(element) {
    let position = 0;
    let direction = -1;
    let step = 2;
    let interval = setInterval(() => {
        position += direction * step;
        element.style.transform = `translateY(${position}px)`;

        if (position <= -30) direction = 1; // Достигли верхней точки
        if (position >= 0) {
            direction = -1; // Вернулись на место
            clearInterval(interval);
        }
    }, 16); // Скорость обновления (~60 FPS)
}
