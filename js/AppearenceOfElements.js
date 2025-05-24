document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Добавляем класс с анимацией
          entry.target.classList.add('animate');
          
          // Удаляем класс после завершения анимации, чтобы можно было снова запустить
          entry.target.addEventListener('animationend', function() {
            entry.target.classList.remove('animate');
            entry.target.style.opacity = '1'; // Сохраняем видимость после анимации
          }, { once: true });
        } else {
          // Когда элемент выходит из области видимости, сбрасываем анимацию
          entry.target.classList.remove('animate');
          entry.target.style.opacity = '0';
        }
      });
    }, {
      threshold: 0.1
    });
    
    // Наблюдаем за всеми элементами
    animateElements.forEach(el => observer.observe(el));
  });