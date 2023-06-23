# Введение в DOM
<br>  

## Браузерное окружение, спецификации
<br>Сегодня `JavaScript` может использоваться в браузере, на веб-сервере или в какой-то другой среде, даже в кофеварке. Каждая среда предоставляет свою функциональность, которую спецификация `JavaScript` называет *окружением*.

*Окружение* предоставляет свои объекты и дополнительные функции, в дополнение базовым языковым. Браузеры, например, дают средства для управления веб-страницами. `Node.js` делает доступными какие-то серверные возможности и так далее.

На картинке ниже в общих чертах показано, что доступно для `JavaScript` в браузерном окружении:<br><br>

<p align="center">
  <img src="./assets/images/browser_environment.png" />
</p><br><br>

Как мы видим, имеется корневой объект `window`, который выступает в 2 ролях:<br>
    1.  **Во-первых**, это глобальный объект для JavaScript-кода.<br>
    2.  **Во-вторых**, он также представляет собой окно браузера и располагает методами для управления им.<br><br>

Ниже приведен пример использования объектов `window`, `document`, `navigator`:
  
```js
// Высота окна в браузере
console.log(window.innerHeight);

// Сменить фон страницы на розовый
document.body.style.background = "red"
// а через секунду вернём как было
setTimeout(() => document.body.style.background = "", 1000);

// На какой платформе запущен браузер
console.log(navigator.platform);
``` 
<br><br>

## DOM (Document Object Model)
Document Object Model`, сокращённо `DOM` – объектная модель документа, которая представляет все содержимое страницы в виде объектов, которые можно менять. (Для управления содержимым HTML-документа).

Объект `document` – основная «входная точка». С его помощью мы можем что-то создавать или менять на странице.<br><br><br>

## BOM (Browser Object Model)
Объектная модель браузера (`Browser Object Model, BOM`) – это дополнительные объекты, предоставляемые браузером (окружением), чтобы работать со всем, кроме документа.