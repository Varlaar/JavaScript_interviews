# ТЕОРИЯ

***Что такое прототип?***

Прототип (Prototype) - это механизм наследования в JavaScript, который позволяет объекту наследовать свойства и методы другого объекта (прототипа).

Каждый объект в JavaScript имеет прототип, который может быть установлен как объект-прототип. Это означает, что любой объект может обращаться к методам и свойствам, присутствующим в его прототипе. Если свойство не найдено в текущем объекте, JavaScript будет искать его в прототипе и так далее до тех пор, пока не будет найдено нужное свойство или не будет достигнут конечный прототип.

Вот некоторые виды прототипного наследования в JavaScript с примерами:

1. ***Объектное наследование***

***1.1 Содание объекта с помощью Object.create(proto, propertiesObject)***

Метод Object.create() создает новый объект, используя существующий объект в качестве прототипа вновь созданного объекта.

*proto*

Объект, который должен быть прототипом вновь созданного объекта.

*propertiesObject*

Если указано, а не undefined, объект, перечисляемые собственные свойства которого определяют дескрипторы свойств, которые должны быть добавлены к вновь созданному объекту, с соответствующими именами свойств. Эти свойства соответствуют второму аргументу Object.defineProperties().

***Пример*** 

***Создаем объект user:***

const user = {
  name: "Alex",
  age: 30,
  isAdmin: false,
  sayHello: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

***Добавляем в прототип главного объекта Object метод sayBuy***

Object.prototype.sayBye = function () {
  console.log(`Bye, ${this.name}!`);
};

***Теперь видим все методы и св-ва доступны для объекта user***

console.log(user.name); // Alex;
user.sayHello(); // Hello, Alex!
user.sayBye(); // Bye, Alex!

***Создаем новый объект newUser, который наследуется от user. Также перезаписываем у него свойство name на Лена***

const newUser = Object.create(user, {
  name: { value: "Lena", writable: false },
});

***Также можем добавлять/удалять поля в новом объекте newUser через точку***

newUser.isAdmin = true;

***Смотрим результаты вывода в консоль***

console.log(newUser.name); // Lena
console.log(newUser.age); // 30
console.log(newUser.isAdmin); // true
newUser.sayHello(); // Hello, Lena!
newUser.sayBye(); // Bye, Lena!

***Теперь не сможем перезаписать св-во, т.к. writable: false***

newUser.name = 'Dima';
console.log(newUser.name); // Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'

***1.2 Содание объекта с __proto__***

__proto__ — это ссылка на prototype, а prototype — это собственно свойство.

__proto__, также известный как объект-прототип, является важным механизмом в JavaScript, который отвечает за наследование и общую доступность свойств и методов в объектах.

Свойство __proto__ является геттером и сеттером для внутреннего слота [[Prototype]] и находится в Object.prototype.

Каждый объект в JavaScript имеет свойство `proto`, которое указывает на его прототип (или объект-прототип). Когда код пытается обратиться к свойству или методу объекта, JavaScript ищет это свойство или метод в самом объекте. Если он не может найти это свойство или метод в самом объекте, он ищет его в свойстве `proto` объекта. Если свойство или метод не найдены, JavaScript продолжает искать в цепочке прототипов, пока не будет найдено нужное свойство или метод.

Этот прототипный механизм наследования позволяет создавать и наследовать классы в JavaScript. В JavaScript нет классической системы классов, как в других языках, но объекты и функции могут использоваться для создания прототипного наследования.

Все объекты по умолчанию имеют прототип `Object.prototype`, который содержит некоторые общие методы, такие как `toString()`, `valueOf()` и т. Д. Вы можете установить прототип объекта на любой другой объект, используя метод `Object.create()` или свойство `__proto__`.

***ПРИМЕР*** 

***Создаем объект person***

const person = {
  name: "Denis",
  age: 20,
  sayHello: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

console.log(person.name); // Denis

***Создаем объект newPerson, которому в качестве ___proto__ задаем person***

const newPerson = {
  name: "Max",
  __proto__: person,
};

***Смотрим результаты в консоли***

console.log(newPerson.name); // Max
console.log(newPerson.age); // 20
newPerson.sayHello(); // Hello, Max!

***Так как каждый объект в JavaScript имеет свойство `proto`, которое указывает на его прототип (или объект-прототип), мы делаем выводы, что прототипом объекта person является главный объект Object, а прототипом для newPerson является объект person***

console.log(person.__proto__ === Object.prototype); // true
console.log(newPerson.__proto__ === person); // true

*** P.S. ***

Свойство __proto__ считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.

*Современные же методы это:*

Object.create(proto[, descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto (может быть null), и необязательными дескрипторами свойств.
Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj (то же самое, что и геттер __proto__).
Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto (то же самое, что и сеттер __proto__).

2. *Конструкторное наследование*

`Конструкторное наследование` - это подход к созданию классов и объектов в JS, которое также использует механизм прототипов.

`Конструкторное наследование в JavaScript` - это один из способов создания наследования между объектами. Он использует функции-конструкторы и их прототипы для передачи свойств и методов от одного объекта к другому

***ПРИМЕР*** 

***Например, у нас есть функция-конструктор Person:***

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  console.log(
    "Hello, my name is " + this.name + " and I am " + this.age + " years old."
  );
};

***Она создает объекты Person с двумя свойствами: name и age, а также методом sayHello, который выводит приветственное сообщение в консоль.***

***Теперь мы хотим создать объект Student, который будет наследовать свойства и методы объекта Person. Для этого мы можем использовать функцию-конструктор Student и поместить в нее вызов функции-конструктора Person:***

function Student(name, age, major) {
  Person.call(this, name, age);
  this.major = major;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayMajor = function () {
  console.log("My major is " + this.major + ".");
};

***Эта функция-конструктор создает объекты Student с тремя свойствами: name, age и major. Также мы используем метод call для вызова функции-конструктора Person в контексте объекта Student.***

***После этого в прототип Student мы помещаем прототип Person, чтобы объекты Student могли наследовать методы объекта Person. Мы также устанавливаем конструктор Student в объект Student.prototype, чтобы он ссылался на правильный конструктор при создании новых объектов.***

***Наконец, мы добавляем метод sayMajor в объект Student.prototype, который выводит информацию о специальности студента.***

***Теперь мы можем создать объект Student и использовать как свойства и методы, наследованные от объекта Person, так и свои собственные методы:***

let student = new Student("John", 20, "Math");

student.sayHello(); // => Hello, my name is John and I am 20 years old.
student.sayMajor(); // => My major is Math.



3. *Наследование через классы*

В JS нет классического наследования, поэтому для создания наследования применяется механизм `прототипов`. 
`Классы` - это всего лишь синтаксический сахар, появившийся в JavaScript в новых стандартах ECMAScript 2015 и обеспечивающий удобный способ создания конструкторов и наследования. 
Классы фактически создают функции-конструкторы, которые могут наследовать свойства и методы от других функций-конструкторов через прототипы.

***ПРИМЕР*** 

***Создаем класс Person***

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greating() {
    console.log(`Hello, ${this.name}!`);
  }
}

***Этот код использует ключевое слово `extends` для наследования свойств и методов из класса `Person`. Конструктор класса `Employee` вызывает конструктор класса `Person` с помощью `super()`. При создании нового экземпляра используется ключевое слово `new`, как и в конструкторном наследовании.***

class Employee extends Person {
  constructor(name, age, job) {
    super(name, age);
    this.job = job;
  }
}

let employee = new Employee("Dima", 38, "developer");

***Смотрим результаты в консоли***

console.log(employee.name); // Dima
console.log(employee.age); // 38
employee.greating(); // Hello, Dima!

4. *Наследование через Object.setPrototypeOf()*

Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto (то же самое, что и сеттер __proto__).

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

Это пример установки прототипа объекта с помощью метода `Object.setPrototypeOf()`. Этот метод устанавливает объект-прототип для любого объекта.
# Важно:  использование Object.setPrototypeOf() не рекомендуется из-за негативного влияния на производительность.
