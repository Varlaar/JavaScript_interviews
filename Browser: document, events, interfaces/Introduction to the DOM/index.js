/* Introduction to the DOM */

console.log(window.innerHeight); // Высота окна в браузере
console.log((document.body.style.background = "red")); // Сменить фон страницы на розовый
setTimeout(() => document.body.style.background = "", 1000);
console.log(navigator.platform); // На какой платформе запущен браузер
