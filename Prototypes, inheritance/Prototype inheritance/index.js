"use strict";

// ***** Прототипное наследование *****

// *** 1. Объектное наследование ***

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



// *** 2. Наследование через Object.setPrototypeOf() ***

const animal = {
  name: "animal",
  hasTail: true,
  sayHi: function () {
    console.log(`Hi, my name is ${this.name}!`);
  },
};

const rabbit = {
  name: "Joody",
};

Object.setPrototypeOf(rabbit, animal);

rabbit.sayHi(); // Hi, my name is Joody!



// *** 3. Наследование через классы ***

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greating() {
    console.log(`Hello, ${this.name}!`);
  }
}

class Employee extends Person {
  constructor(name, age, job) {
    super(name, age);
    this.job = job;
  }
}

let employee = new Employee("Dima", 38, "developer");

console.log(employee.name); // Dima
console.log(employee.age); // 38
employee.greating(); // Hello, Dima!



// *** 4. Конструкторное наследование ***

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  console.log(
    "Hello, my name is " + this.name + " and I am " + this.age + " years old."
  );
};

function Student(name, age, major) {
  Person.call(this, name, age);
  this.major = major;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayMajor = function () {
  console.log("My major is " + this.major + ".");
};

let student = new Student("John", 20, "Math");

student.sayHello(); // => Hello, my name is John and I am 20 years old.
student.sayMajor(); // => My major is Math.
