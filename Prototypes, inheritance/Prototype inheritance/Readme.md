# ТЕОРИЯ

**_Что такое прототип?_**

Прототип (Prototype) - это механизм наследования в JavaScript, который позволяет объекту наследовать свойства и методы другого объекта (прототипа).

Каждый объект в JavaScript имеет прототип, который может быть установлен как объект-прототип. Это означает, что любой объект может обращаться к методам и свойствам, присутствующим в его прототипе. Если свойство не найдено в текущем объекте, JavaScript будет искать его в прототипе и так далее до тех пор, пока не будет найдено нужное свойство или не будет достигнут конечный прототип.

Вот некоторые виды прототипного наследования в JavaScript с примерами:

1. **_Объектное наследование_**

**_1.1 Содание объекта с помощью Object.create(proto, propertiesObject)_**

Метод Object.create() создает новый объект, используя существующий объект в качестве прототипа вновь созданного объекта.

_proto_
Объект, который должен быть прототипом вновь созданного объекта.

_propertiesObject_
Если указано, а не undefined, объект, перечисляемые собственные свойства которого определяют дескрипторы свойств, которые должны быть добавлены к вновь созданному объекту, с соответствующими именами свойств. Эти свойства соответствуют второму аргументу Object.defineProperties().

**_Пример_**

**_Создаем объект user:_**

const user = {
name: "Alex",
age: 30,
isAdmin: false,
sayHello: function () {
console.log(`Hello, ${this.name}!`);
},
};

**_Добавляем в прототип главного объекта Object метод sayBuy_**

Object.prototype.sayBye = function () {
console.log(`Bye, ${this.name}!`);
};

**_Теперь видим все методы и св-ва доступны для объекта user_**

console.log(user.name); // Alex;
user.sayHello(); // Hello, Alex!
user.sayBye(); // Bye, Alex!

**_Создаем новый объект newUser, который наследуется от user. Также перезаписываем у него свойство name на Лена_**

const newUser = Object.create(user, {
name: { value: "Lena", writable: false },
});

**_Также можем добавлять/удалять поля в новом объекте newUser через точку_**

newUser.isAdmin = true;

**_Смотрим результаты вывода в консоль_**

console.log(newUser.name); // Lena
console.log(newUser.age); // 30
console.log(newUser.isAdmin); // true
newUser.sayHello(); // Hello, Lena!
newUser.sayBye(); // Bye, Lena!

**_Теперь не сможем перезаписать св-во, т.к. writable: false_**

newUser.name = 'Dima';
console.log(newUser.name); // Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'

**_1.2 Содание объекта с **proto**_**

**proto** — это ссылка на prototype, а prototype — это собственно свойство.

**proto**, также известный как объект-прототип, является важным механизмом в JavaScript, который отвечает за наследование и общую доступность свойств и методов в объектах.

Свойство **proto** является геттером и сеттером для внутреннего слота [[Prototype]] и находится в Object.prototype.

Каждый объект в JavaScript имеет свойство `proto`, которое указывает на его прототип (или объект-прототип). Когда код пытается обратиться к свойству или методу объекта, JavaScript ищет это свойство или метод в самом объекте. Если он не может найти это свойство или метод в самом объекте, он ищет его в свойстве `proto` объекта. Если свойство или метод не найдены, JavaScript продолжает искать в цепочке прототипов, пока не будет найдено нужное свойство или метод.

Этот прототипный механизм наследования позволяет создавать и наследовать классы в JavaScript. В JavaScript нет классической системы классов, как в других языках, но объекты и функции могут использоваться для создания прототипного наследования.

Все объекты по умолчанию имеют прототип `Object.prototype`, который содержит некоторые общие методы, такие как `toString()`, `valueOf()` и т. Д. Вы можете установить прототип объекта на любой другой объект, используя метод `Object.create()` или свойство `__proto__`.

**_ПРИМЕР_**

**_Создаем объект person_**

const person = {
name: "Denis",
age: 20,
sayHello: function () {
console.log(`Hello, ${this.name}!`);
},
};

console.log(person.name); // Denis

**_Создаем объект newPerson, которому в качестве **\_proto** задаем person_**

const newPerson = {
name: "Max",
**proto**: person,
};

**_Смотрим результаты в консоли_**

console.log(newPerson.name); // Max
console.log(newPerson.age); // 20
newPerson.sayHello(); // Hello, Max!

**_Так как каждый объект в JavaScript имеет свойство `proto`, которое указывает на его прототип (или объект-прототип), мы делаем выводы, что прототипом объекта person является главный объект Object, а прототипом для newPerson является объект person_**

console.log(person.**proto** === Object.prototype); // true
console.log(newPerson.**proto** === person); // true

**_ P.S. _**

Свойство **proto** считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.

_Современные же методы это:_

Object.create(proto[, descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto (может быть null), и необязательными дескрипторами свойств.
Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj (то же самое, что и геттер **proto**).
Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto (то же самое, что и сеттер **proto**).

2. _Конструкторное наследование_

`Конструкторное наследование` - это подход к созданию классов и объектов в JS, которое также использует механизм прототипов.

`Конструкторное наследование в JavaScript` - это один из способов создания наследования между объектами. Он использует функции-конструкторы и их прототипы для передачи свойств и методов от одного объекта к другому

**_ПРИМЕР_**

**_Например, у нас есть функция-конструктор Person:_**

function Person(name, age) {
this.name = name;
this.age = age;
}

Person.prototype.sayHello = function () {
console.log(
"Hello, my name is " + this.name + " and I am " + this.age + " years old."
);
};

**_Она создает объекты Person с двумя свойствами: name и age, а также методом sayHello, который выводит приветственное сообщение в консоль._**

**_Теперь мы хотим создать объект Student, который будет наследовать свойства и методы объекта Person. Для этого мы можем использовать функцию-конструктор Student и поместить в нее вызов функции-конструктора Person:_**

function Student(name, age, major) {
Person.call(this, name, age);
this.major = major;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayMajor = function () {
console.log("My major is " + this.major + ".");
};

**_Эта функция-конструктор создает объекты Student с тремя свойствами: name, age и major. Также мы используем метод call для вызова функции-конструктора Person в контексте объекта Student._**

**_После этого в прототип Student мы помещаем прототип Person, чтобы объекты Student могли наследовать методы объекта Person. Мы также устанавливаем конструктор Student в объект Student.prototype, чтобы он ссылался на правильный конструктор при создании новых объектов._**

**_Наконец, мы добавляем метод sayMajor в объект Student.prototype, который выводит информацию о специальности студента._**

**_Теперь мы можем создать объект Student и использовать как свойства и методы, наследованные от объекта Person, так и свои собственные методы:_**

let student = new Student("John", 20, "Math");

student.sayHello(); // => Hello, my name is John and I am 20 years old.
student.sayMajor(); // => My major is Math.

3. _Наследование через классы_

В JS нет классического наследования, поэтому для создания наследования применяется механизм `прототипов`.
`Классы` - это всего лишь синтаксический сахар, появившийся в JavaScript в новых стандартах ECMAScript 2015 и обеспечивающий удобный способ создания конструкторов и наследования.
Классы фактически создают функции-конструкторы, которые могут наследовать свойства и методы от других функций-конструкторов через прототипы.

**_ПРИМЕР_**

**_Создаем класс Person_**

class Person {
constructor(name, age) {
this.name = name;
this.age = age;
}

greating() {
console.log(`Hello, ${this.name}!`);
}
}

**_Этот код использует ключевое слово `extends` для наследования свойств и методов из класса `Person`. Конструктор класса `Employee` вызывает конструктор класса `Person` с помощью `super()`. При создании нового экземпляра используется ключевое слово `new`, как и в конструкторном наследовании._**

class Employee extends Person {
constructor(name, age, job) {
super(name, age);
this.job = job;
}
}

let employee = new Employee("Dima", 38, "developer");

**_Смотрим результаты в консоли_**

console.log(employee.name); // Dima
console.log(employee.age); // 38
employee.greating(); // Hello, Dima!

4. _Наследование через Object.setPrototypeOf()_

Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto (то же самое, что и сеттер **proto**).

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

# Важно: использование Object.setPrototypeOf() не рекомендуется из-за негативного влияния на производительность.
