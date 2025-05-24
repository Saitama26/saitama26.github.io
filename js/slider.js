const buttonBefore = document.querySelector('.switcher__button--before');
const buttonAfter = document.querySelector('.switcher__button--after');
const imageBefore = document.querySelector('.example__image--before');
const imageAfter = document.querySelector('.example__image--after');
const switcherRange = document.querySelector('.switcher__range');
const slider = document.querySelector('.example__images');

function updateSlider(value) {
  const percent = value / 100;

  if (window.matchMedia('(max-width: 767px)').matches) {
      // Сбрасываем clip-path в мобильном режиме
      imageBefore.style.clipPath = "none";
      imageAfter.style.clipPath = "none";

      if (value < 50) {
          switcherRange.value = 0;
          imageBefore.style.opacity = 1;
          imageAfter.style.opacity = 0;
      } else {
          switcherRange.value = 100;
          imageBefore.style.opacity = 0;
          imageAfter.style.opacity = 1;
      }

  } else {
      // Десктоп - используем clip-path
      imageBefore.style.opacity = 1;
      imageAfter.style.opacity = 1;
      imageAfter.style.clipPath = `inset(0 ${100 - (percent * 100)}% 0 0)`;
      imageBefore.style.clipPath = `inset(0 0 0 ${percent * 100}%)`;
  }
}

// Обработчик изменения размера окна (чтобы сбрасывать стили при смене режима)
window.addEventListener('resize', () => {
  updateSlider(switcherRange.value);
});



// Обработчики событий для кнопок
buttonBefore.addEventListener('click', () => {
  switcherRange.value = 0;
  updateSlider(0);
});

buttonAfter.addEventListener('click', () => {
  switcherRange.value = 100;
  updateSlider(100);
});

// Обработчик для ползунка
switcherRange.addEventListener('input', (e) => {
  updateSlider(e.target.value);
});

// Обработчик изменения размера окна (переключение между мобильным и десктопом)
window.addEventListener('resize', () => {
  updateSlider(switcherRange.value);
});

// Устанавливаем начальное значение
switcherRange.value = 50;
updateSlider(50);
