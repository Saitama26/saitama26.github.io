window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const links = document.querySelectorAll('a');
        const colors = new Set();

        links.forEach(link => {
            const color = window.getComputedStyle(link).color;
            colors.add(color);
        });

        const displayDiv = document.createElement('div');
        displayDiv.style.marginTop = '20px';
        displayDiv.innerHTML = "<strong>Цвета ссылок на странице:</strong>";

        colors.forEach(color => {
            const p = document.createElement('div');
            p.textContent = `Цвет гиперссылки: ${color}`;
            p.style.color = color;
            displayDiv.appendChild(p);
        });

        // вставим результат после .link
        const linkDiv = document.querySelector('img');
        linkDiv.parentNode.insertBefore(displayDiv, linkDiv.nextSibling);
    }, 5000);
});

function swapNodes() {
    const list = document.getElementById('nodeList');
    const items = list.querySelectorAll('li');

    if (items.length >= 3) {
        const second = items[1];
        const third = items[2];

        // Клонируем узлы и меняем местами
        const secondClone = second.cloneNode(true);
        const thirdClone = third.cloneNode(true);

        list.replaceChild(thirdClone, second);
        list.replaceChild(secondClone, third);
    }
}

function highlightFirst() {
    const firstElem = document.body.firstElementChild;

    if (firstElem) {
        firstElem.style.position = 'fixed';
        firstElem.style.bottom = '0';
        firstElem.style.right = '0';
        firstElem.style.backgroundColor = 'red';
        firstElem.style.color = 'yellow';
        firstElem.style.padding = '10px';
        firstElem.style.zIndex = '9999';
    }
}

function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = "Неизвестный";
    let fullVersion = "Неизвестно";

    if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Mozilla Firefox";
        fullVersion = userAgent.match(/Firefox\/([0-9.]+)/)[1];
    } else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") === -1) {
        browserName = "Google Chrome";
        fullVersion = userAgent.match(/Chrome\/([0-9.]+)/)[1];
    } else if (userAgent.indexOf("Edg") > -1) {
        browserName = "Microsoft Edge";
        fullVersion = userAgent.match(/Edg\/([0-9.]+)/)[1];
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari";
        fullVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || "Неизвестно";
    }

    return `Браузер: ${browserName}, версия: ${fullVersion}`;
}

let infoWindow;

window.addEventListener('DOMContentLoaded', () => {
    infoWindow = window.open("", "_blank", "width=400,height=200");

    setInterval(() => {
        if (infoWindow && !infoWindow.closed) {
            const info = getBrowserInfo();
            const now = new Date().toLocaleTimeString();
            infoWindow.document.body.innerHTML += `<p>${now} — ${info}</p>`;
        } else {
            clearInterval(this);
        }
    }, 3000);
});




document.addEventListener('DOMContentLoaded', function() {
    // Добавляем звездочки для обязательных полей
    document.querySelectorAll('[required]').forEach(input => {
        const label = input.closest('.form-row')?.querySelector('label') || 
                     input.closest('.checkbox-group')?.querySelector('label');
        if (label && !label.querySelector('.required')) {
            label.innerHTML += ' <span class="required" style="color:red">*</span>';
        }
    });

    // Функция валидации email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Функция валидации поля
    function validateField(input, validationFn, errorMessage) {
        const inputField = input.closest('.input-field') || input.closest('.form-row') || input.closest('.checkbox-group');
        const errorMsg = inputField.querySelector('.error-message:not(.terms-error):not(.date-error)') || 
                        inputField.querySelector('.error-message');
        const validIcon = inputField.querySelector('.valid-icon');
        const errorIcon = inputField.querySelector('.error-icon');
        
        if (validationFn(input.value || input.checked)) {
            input.classList?.remove('error');
            input.classList?.add('valid');
            if (errorMsg) errorMsg.style.display = 'none';
            if (validIcon) validIcon.style.display = 'block';
            if (errorIcon) errorIcon.style.display = 'none';
            return true;
        } else {
            input.classList?.remove('valid');
            input.classList?.add('error');
            if (errorMsg) {
                errorMsg.textContent = errorMessage;
                errorMsg.style.display = 'block';
            }
            if (validIcon) validIcon.style.display = 'none';
            if (errorIcon) errorIcon.style.display = 'block';
            return false;
        }
    }

    // Валидация при вводе
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.type === 'email') {
                validateField(this, validateEmail, 'Пожалуйста, введите корректный email');
            } else if (this.type === 'password') {
                validateField(this, val => val.length >= 6 && val.length <= 20, 
                             'Пароль должен содержать от 6 до 20 символов');
            } else if (this.id === 'name') {
                validateField(this, val => /^[А-Яа-яЁёA-Za-z\s]{5,50}$/.test(val), 
                             'Введите полное имя (от 5 до 50 символов, только буквы)');
            } else if (this.id === 'birth-day') {
                validateField(this, val => /^(0?[1-9]|[12][0-9]|3[01])$/.test(val), 
                             'День должен быть от 1 до 31');
            } else if (this.id === 'birth-year') {
                validateField(this, val => /^(19|20)\d{2}$/.test(val), 
                             'Год должен быть между 1900 и текущим');
            }
        });
    });

    // Проверка совпадения email
    document.getElementById('repeat-email').addEventListener('input', function() {
        const email = document.getElementById('reg-email').value;
        validateField(this, val => val === email, 'Email должен совпадать');
    });

    // Проверка совпадения паролей
    document.getElementById('repeat-password').addEventListener('input', function() {
        const password = document.getElementById('reg-password').value;
        validateField(this, val => val === password, 'Пароли должны совпадать');
    });

    // Валидация месяца рождения
    document.getElementById('birth-month').addEventListener('change', function() {
        validateField(this, val => val !== '', 'Пожалуйста, выберите месяц');
    });

    // Валидация чекбокса условий
    document.getElementById('terms').addEventListener('change', function() {
        validateField(this, val => val, 'Это поле обязательно');
    });

    // Проверка всей даты рождения
    function validateBirthDate() {
        const day = document.getElementById('birth-day').value;
        const month = document.getElementById('birth-month').value;
        const year = document.getElementById('birth-year').value;
        const errorMsg = document.querySelector('.date-error');
        
        if (!day || !month || !year) {
            errorMsg.style.display = 'block';
            return false;
        }
        
        // Проверка корректности даты
        const date = new Date(year, month-1, day);
        if (isNaN(date.getTime()) || 
            date.getDate() != day || 
            date.getMonth() != month-1 || 
            date.getFullYear() != year) {
            errorMsg.style.display = 'block';
            return false;
        }
        
        errorMsg.style.display = 'none';
        return true;
    }

    // Валидация при отправке формы авторизации
    document.getElementById('login-btn').addEventListener('click', function(e) {
        e.preventDefault();
        let isValid = true;
        
        isValid = validateField(document.getElementById('email'), validateEmail, 'Пожалуйста, введите корректный email') && isValid;
        isValid = validateField(document.getElementById('password'), val => val.length >= 6, 'Пароль должен содержать минимум 6 символов') && isValid;
        
        if (isValid) {
            alert('Форма авторизации отправлена!');
            // document.forms['auth-form'].submit();
        } else {
            document.querySelector('.error')?.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    });

    // Валидация при отправке формы регистрации
    document.getElementById('register-btn').addEventListener('click', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Проверка обязательных полей
        isValid = validateField(document.getElementById('name'), val => /^[А-Яа-яЁёA-Za-z\s]{5,50}$/.test(val), 'Введите полное имя (от 5 до 50 символов)') && isValid;
        isValid = validateField(document.getElementById('reg-email'), validateEmail, 'Пожалуйста, введите корректный email') && isValid;
        isValid = validateField(document.getElementById('repeat-email'), val => val === document.getElementById('reg-email').value, 'Email должен совпадать') && isValid;
        isValid = validateField(document.getElementById('reg-password'), val => val.length >= 6, 'Пароль должен содержать минимум 6 символов') && isValid;
        isValid = validateField(document.getElementById('repeat-password'), val => val === document.getElementById('reg-password').value, 'Пароли должны совпадать') && isValid;
        isValid = validateField(document.getElementById('birth-day'), val => /^(0?[1-9]|[12][0-9]|3[01])$/.test(val), 'День должен быть от 1 до 31') && isValid;
        isValid = validateField(document.getElementById('birth-month'), val => val !== '', 'Пожалуйста, выберите месяц') && isValid;
        isValid = validateField(document.getElementById('birth-year'), val => /^(19|20)\d{2}$/.test(val), 'Год должен быть между 1900 и текущим') && isValid;
        isValid = validateBirthDate() && isValid;
        isValid = validateField(document.getElementById('terms'), val => val, 'Это поле обязательно') && isValid;
        
        if (isValid) {
            alert('Форма регистрации отправлена!');
            // document.forms['reg-form'].submit();
        } else {
            document.querySelector('.error')?.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    });
});