document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Добавляем класс с анимацией только если его еще нет
                if (!entry.target.classList.contains('animate')) {
                    entry.target.classList.add('animate');
                }
            }
            // Не нужно удалять класс или сбрасывать opacity при выходе из зоны видимости
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(el => observer.observe(el));
});