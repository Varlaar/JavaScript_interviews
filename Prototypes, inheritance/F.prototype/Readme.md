# F.prototype
<br>  

## Что такое F.prototype?
<br>**F.prototype** - это свойство объекта функции `F`, которое ссылается на объект прототипа. Объект прототипа используется для определения свойств и методов, которые будут унаследованы экземплярами объекта функции `F`.

Другими словами, новые объекты могут быть созданы с помощью функции-конструктора `new F()`.

Если в `F.prototype` содержится объект, оператор `new` устанавливает его в качестве `[[Prototype]]` для нового объекта.

Свойство `prototype` можно указать на любом объекте, но особый смысл оно имеет, если назначено *функции*.<br><br>
### **Пример:**  

*Создаем объект user:*
```js
const user = {
  name: "David",
  job: "developer",
};
```
<br>*Создаем функцию-конструктор `Admin`:*
```js
function Admin(name, isAdmin) {
  this.name = name, 
  this.isAdmin = isAdmin
}
```
<br>*В качестве прототипа для функции `Admin` устанавливается объект `user`.<br>
Теперь все экземпляры `Admin` будут иметь доступ к свойствам и методам объекта `user`.*
```js
Admin.prototype = user;
```
<br>*Создается новый экземпляр `admin` функции `Admin` со значениями аргументов `Denis` и `true`.<br>Теперь объект `admin` наследует свойства объекта `user`.*
```js
const admin = new Admin("Denis", true);
```
<br>*Смотрим результаты вывода в консоли.*
```js
console.log(admin.name); // Denis
console.log(admin.isAdmin); // true
console.log(admin.job); // developer
```
<br>*Чтобы убедиться, что `admin` наследуется от объекта `user` можно выполнить проверку:*
```js
console.log(admin.prototype === user.prototype); // true
console.log(admin.__proto__=== user); // true
```
<br>**P.S.** Таким образом можно сделать следующие выводы:

1. *`admin` является экземпляром функции `Admin`, а `user` был установлен в качестве прототипа функции `Admin`. Следовательно, `admin` наследует прототип от `user.prototype`. Это объясняет, почему `admin.prototype === user.prototype` возвращает `true`.*

2. *`__proto__` - это свойство, которое ссылается на прототип объекта. Так как `admin` является экземпляром функции `Admin`, то `admin.__proto__` ссылается на прототип данной функции. Прототипом функции `Admin` является объект `user`, так что `admin.__proto__` ссылается на этот объект. Поэтому `admin.__proto__=== user` возвращает `true`.*<br><br><br>


## F.prototype по умолчанию, свойство constructor?