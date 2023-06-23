/* Introduction to the DOM */

// Высота окна в браузере
console.log(window.innerHeight);

// Сменить фон страницы на розовый
document.body.style.background = "red";
// а через секунду вернём как было
setTimeout(() => (document.body.style.background = ""), 1000);

// На какой платформе запущен браузер
console.log(navigator.platform);




