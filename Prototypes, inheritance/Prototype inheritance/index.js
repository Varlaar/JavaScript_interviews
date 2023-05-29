"use strict";

// ***** Прототипное наследование *****

// ***1. Объектное наследование ***

// Пример (Object.create(proto, propertiesObject))

const user = {
  name: "Alex",
  age: 30,
  isAdmin: false,
  sayHello: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

Object.prototype.sayBye = function () {
  console.log(`Bye, ${this.name}!`);
};

console.log(user.name); // Alex;
user.sayHello(); // Hello, Alex!
user.sayBye(); // Bye, Alex!

const newUser = Object.create(user, {
  name: { value: "Lena", writable: false },
});
newUser.isAdmin = true;

console.log(newUser.name); // Lena
console.log(newUser.age); // 30
console.log(newUser.isAdmin); // true
newUser.sayHello(); // Hello, Lena!
newUser.sayBye(); // Bye, Lena!

// Теперь не сможем перезаписать св-во, т.к. writable: false:
// newUser.name = 'Dima';
// console.log(newUser.name); // Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'

// ********************************************************************************************************************************************* //

// Пример (с __proto__)

const person = {
  name: "Denis",
  age: 20,
  sayHello: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

console.log(person.name); // Denis

const newPerson = {
  name: "Max",
  __proto__: person,
};

console.log(newPerson.name); // Max
console.log(newPerson.age); // 20
newPerson.sayHello(); // Hello, Max!

console.log(person.__proto__ === Object.prototype); // true
console.log(newPerson.__proto__ === person); // true

// ********************************************************************************************************************************************* //

// ***2. Объектное наследование ***
