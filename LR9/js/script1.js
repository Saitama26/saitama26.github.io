// if, else if
let score = 85;
if (score >= 90) {
  alert("Отлично");
} else if (score >= 75) {
  alert("Хорошо");
} else {
  alert("Попробуй ещё");
}

// switch
let day = "понедельник";
switch (day) {
  case "понедельник":
    alert("Начало недели");
    break;
  case "пятница":
    alert("Почти выходные!");
    break;
  default:
    alert("Просто день");
}

// for + continue
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  document.write("Число:", i);
}

// while + break
let x = 0;
while (true) {
  if (x === 3) break;
  alert("x =", x);
  x++;
}

// do...while + return в функции
function getGreeting(name) {
  do {
    if (!name) return "Имя не указано";
    return "Привет, " + name + "!";
  } while (false);
}

alert(getGreeting("Кирилл"));
