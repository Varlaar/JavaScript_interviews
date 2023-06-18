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


## F.prototype по умолчанию, свойство constructor
<br>Когда вы создаете новую функцию в JavaScript, она автоматически получает свойство `prototype`, которое ссылается на объект. Этот объект называется *прототипом* функции.

По умолчанию `prototype` – объект с единственным свойством `constructor`, которое ссылается на функцию-конструктор.<br><br>
### **Пример:**  

*Чтобы в этом убедиться, создадим простую функцию `Colors`, которая ничего не принимает и не возвращает:*
```js
function Colors() {}

/* прототип по умолчанию
Colors.prototype = { constructor: Colors };
*/

console.log(Colors.prototype.constructor == Colors ); // true
```
<br>Рассмотрим еще несколько простых примеров.<br><br>

### **Пример:** 
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let bob = new Person("Bob", 25);

console.log(bob.constructor); // ƒ Person(name, age)
console.log(Person.prototype); // {constructor: ƒ}
console.log(bob.__proto__); // {constructor: ƒ}
console.log(Person.prototype === bob.__proto__); // true
```
<br>*При создании экземпляра `bob` с помощью `new Person("Bob", 25)`, JavaScript автоматически устанавливает свойство `constructor` для `bob`, которое ссылается на конструктор `Person`. Это свойство может использоваться, чтобы проверить, что объект был создан с помощью нужного конструктора.*<br>

*Поскольку экземпляр `bob` создается с помощью вызова `new Person("Bob", 25)`, его `__proto__` будет указывать на `Person.prototype`, что подтверждается в консоли.*<br><br>

### **Пример:** 
```js
function Animal(kind) {
  this.kind = kind;
}

Animal.prototype.speak = function () {
  console.log("I am an animal");
};

function Cat(name) {
  Animal.call(this, "cat");
  this.name = name;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

let fluffy = new Cat("Fluffy");

fluffy.speak(); // "I am an animal"
console.log(fluffy.constructor); // ƒ Cat(name)
```
<br>*Этот пример демонстрирует, как мы можем использовать прототипы, чтобы наследовать свойства и методы между объектами. Конструктор `Cat` устанавливает свойства `name` и `kind` для экземпляра `this`, а затем мы используем `Animal.call(this, "cat")`, чтобы перенести свойства `kind` и `speak` от `Animal` на `Cat`. Затем мы устанавливаем `Cat.prototype` равным `new Animal()`, чтобы наследовать свойства и методы прототипа `Animal`, и устанавливаем `constructor` для `Cat`. Создание экземпляра `fluffy` с помощью `new Cat("Fluffy")` позволяет нам проверить, что `fluffy.constructor` указывает на конструктор `Cat`.*

<br>*В целом, `F.prototype` по умолчанию является объектом `{ constructor: F }`, который имеет свойство `constructor`, указывающее на конструктор `F`. Свойство `constructor` также может быть изменено для объектов, на которые F.prototype ссылается, и, таким образом, изменить, какой конструктор будет связан с объектом.*<br><br>

Мы можем использовать свойство `constructor` существующего объекта для создания нового.
<br>Рассмотрим пример ниже.<br><br>

### **Пример:** 
```js
function Rabbit(name) {
  this.name = name;
}

let rabbit = new Rabbit("White Rabbit");
let rabbit2 = new rabbit.constructor("Black Rabbit");

console.log(rabbit.name); // White Rabbit
console.log(rabbit2.name); // Black Rabbit
```
<br>*Это удобно, когда у нас есть объект, но мы не знаем, какой конструктор использовался для его создания (например, он мог быть взят из сторонней библиотеки), а нам необходимо создать ещё один такой объект.*<br><br>

<br>Но, пожалуй, самое важное о свойстве `constructor` это то, что…

…JavaScript сам по себе не гарантирует правильное значение свойства `constructor`.

Да, оно является свойством по умолчанию в `prototype` у функций, но что случится с ним позже – зависит только от нас.

В частности, если мы заменим прототип по умолчанию на другой объект, то свойства `constructor` в нём не будет.<br><br>

### **Пример:** 
```js
function Fn() {}

Fn.prototype = {
  name: "Dima",
};

const users = new Fn();
console.log(users.constructor === Fn); // false
```
<br>*Таким образом, чтобы сохранить верное свойство `constructor`, мы должны добавлять/удалять/изменять свойства у `прототипа` по умолчанию вместо того, чтобы перезаписывать его целиком:*

```js
function Fn() {}

Fn.prototype.name = "Dima"

const users = new Fn();
console.log(users.constructor === Fn); // true
```
<br>*Либо заново создать свойство `constructor`:*

```js
function Fn() {}

Fn.prototype = {
  name: "Dima",
  constructor: Fn
};

const users = new Fn();
console.log(users.constructor === Fn); // true
```
<br>**Итого:**

1. Свойство F.prototype (не путать с `[[Prototype]]`) устанавливает`[[Prototype]]` для новых объектов при вызове `new F()`. 
   
2. Значение `F.prototype` должно быть либо объектом, либо `null`. Другие значения не будут работать.   

3. Свойство `prototype` является особым, только когда оно назначено функции-конструктору, которая вызывается оператором `new`.