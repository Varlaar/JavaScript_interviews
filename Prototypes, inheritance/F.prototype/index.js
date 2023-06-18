"use strict";

// ***** F.prototype *****

// Пример 1
const user = {
  name: "David",
  job: "developer",
};

function Admin(name, isAdmin) {
  (this.name = name), (this.isAdmin = isAdmin);
}

Admin.prototype = user;

const admin = new Admin("Denis", true);

console.log(admin.name); // Denis
console.log(admin.isAdmin); // true
console.log(admin.job); // developer

console.log(admin.prototype === user.prototype); // true
console.log(admin.__proto__ === user); // true

// ***** F.prototype по умолчанию, свойство constructor *****

// Пример 1

function Colors() {}

/* прототип по умолчанию
Colors.prototype = { constructor: Colors };
*/

console.log(Colors.prototype.constructor == Colors); // true

// Пример 2

function Person(name, age) {
  this.name = name;
  this.age = age;
}

let bob = new Person("Bob", 25);

console.log(bob.constructor); // ƒ Person(name, age)
console.log(Person.prototype); // {constructor: ƒ}
console.log(bob.__proto__); // {constructor: ƒ}
console.log(Person.prototype === bob.__proto__); // true

// Пример 3

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

// Пример 4

function Rabbit(name) {
  this.name = name;
}

let rabbit = new Rabbit("White Rabbit");
let rabbit2 = new rabbit.constructor("Black Rabbit");

console.log(rabbit.name); // White Rabbit
console.log(rabbit2.name); // Black Rabbit

// Пример 5

function Dog() {}
Dog.prototype = {
  hasTail: true,
};

let cat = new Dog();
console.log(cat.constructor === Dog); // false

// Пример 6
function Fn() {}
Fn.prototype = {
  name: "Dima",
};

const users = new Fn();
console.log(users.constructor === Fn); // false



// Не перезаписываем Fn.prototype полностью,
// а добавляем к нему свойство

// function Fn() {}
// Fn.prototype.name = "Dima"

// const users = new Fn();
// console.log(users.constructor === Fn); // true



// Прототип по умолчанию сохраняется, и мы всё ещё имеем доступ к Rabbit.prototype.constructor

// function Fn() {}
// Fn.prototype = {
//   name: "Dima",
//   constructor: Fn
// };

// const users = new Fn();
// console.log(users.constructor === Fn); // true