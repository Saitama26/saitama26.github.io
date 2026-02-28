// --- Регистрация ---
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const phone = document.getElementById("phone").value.trim();

  // Проверки
  if (username.length < 3) {
    alert("Имя пользователя должно содержать минимум 3 символа");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Введите корректный email");
    return;
  }

  if (password.length < 6) {
    alert("Пароль должен содержать минимум 6 символов");
    return;
  }

  if (password !== confirmPassword) {
    alert("Пароли не совпадают");
    return;
  }

  const phonePattern = /^\+?\d{10,15}$/;
  if (!phonePattern.test(phone)) {
    alert("Введите корректный номер телефона (10–15 цифр, можно с +)");
    return;
  }

  // JSON-объект
  const userData = { username, email, password, phone };
  const jsonData = JSON.stringify(userData);

  // Сохраняем в localStorage
  localStorage.setItem("userData", jsonData);

  // Сохраняем в cookies (7 дней)
  document.cookie = `userData=${encodeURIComponent(jsonData)}; max-age=${7*24*60*60}; path=/`;

  alert("Регистрация успешна! Данные сохранены.");
});

// --- Авторизация ---
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const loginEmail = document.getElementById("loginEmail").value.trim();
  const loginPassword = document.getElementById("loginPassword").value;

  // Получаем данные из localStorage
  const storedData = localStorage.getItem("userData");
  if (!storedData) {
    alert("Нет зарегистрированных пользователей");
    return;
  }

  const userData = JSON.parse(storedData);

  // Проверка email и пароля
  if (loginEmail === userData.email && loginPassword === userData.password) {
    alert(`Добро пожаловать, ${userData.username}!`);
  } else {
    alert("Неверный email или пароль");
  }
});
