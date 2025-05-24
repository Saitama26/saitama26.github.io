document.querySelectorAll(".catalogues__item").forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.transition = "transform 0.3s ease-in-out, background 0.3s ease-in-out";
        item.style.transform = "scale(1.05)";
        item.style.background = "linear-gradient(135deg, rgba(104, 183, 56, 0.4) 0%, rgba(104, 183, 56, 0) 100%)";
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "scale(1)";
        item.style.background = "#f2f2f2"; // Возвращаем исходный цвет
    });
});
