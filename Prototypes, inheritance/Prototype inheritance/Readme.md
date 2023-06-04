# Прототипное наследование

## Что такое прототип?
<br>**Прототип (Prototype)** - это механизм наследования в JavaScript, который позволяет объекту наследовать свойства и методы другого объекта (прототипа).<br><br>
Каждый объект в JavaScript имеет прототип, который может быть установлен как объект-прототип. Это означает, что любой объект может обращаться к методам и свойствам, присутствующим в его прототипе. Если свойство не найдено в текущем объекте, JavaScript будет искать его в прототипе и так далее до тех пор, пока не будет найдено нужное свойство или не будет достигнут конечный прототип.<br><br>
*Ниже приведены примеры прототипного наследования в JavaScript.*<br><br><br><br>

## 1. Объектное наследование
<br>

### 1.1 Содание объекта с помощью `Object.create(proto, propertiesObject)`.
<br>Метод `Object.create(proto, propertiesObject)` создает новый объект, используя существующий объект в качестве прототипа вновь созданного объекта.

<br>`proto`

Объект, который должен быть прототипом вновь созданного объекта.

<br>`propertiesObject`

Если указано, а не `undefined`, объект, перечисляемые собственные свойства которого определяют дескрипторы свойств, которые должны быть добавлены к вновь созданному объекту, с соответствующими именами свойств. Эти свойства соответствуют второму аргументу `Object.defineProperties()`.<br><br>
### **Пример:**

<br>*Создаем объект user:*
```js
const user = {
  name: "Alex",
  age: 30,
  isAdmin: false,
  sayHello: function () {
    console.log(`Hello, ${this.name}!`);
  },
};
```
<br>*Добавляем в прототип главного объекта `Object` метод `sayBye()`:*
```js
Object.prototype.sayBye = function () {
  console.log(`Bye, ${this.name}!`);
};
```

<br>*Теперь видим, что все методы и свойствава доступны для объекта `user`:*

```js
console.log(user.name); // Alex;
user.sayHello(); // Hello, Alex!
user.sayBye(); // Bye, Alex!
```

<br>*Создаем новый объект `newUser`, который наследуется от `user`.
Также перезаписываем у него свойство `name` на Лена:*

```js
const newUser = Object.create(user, {
  name: { value: "Lena", writable: false },
});
```

<br>*Можем добавлять / удалять поля в новом объекте newUser через точку:*

```js
newUser.isAdmin = true;
```

<br>*Смотрим результаты вывода в консоль:*

```js
console.log(newUser.name); // Lena
console.log(newUser.age); // 30
console.log(newUser.isAdmin); // true
newUser.sayHello(); // Hello, Lena!
newUser.sayBye(); // Bye, Lena!
```

<br>*Теперь не сможем перезаписать свойство, т.к. `writable: false`:*

```js
newUser.name = 'Dima';
console.log(newUser.name); // Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
```
<br><br>

### 1.2 Содание объекта с `__proto__`.<br><br>
`__proto__` — это ссылка на prototype, а prototype — это собственно свойство.

<br>`__proto__`, также известный как объект-прототип, является важным механизмом в JavaScript, который отвечает за наследование и общую доступность свойств и методов в объектах.
<br><br>Свойство `__proto__` является геттером и сеттером для внутреннего слота `[[Prototype]]` и находится в `Object.prototype`.

<br>Каждый объект в JavaScript имеет свойство `proto`, которое указывает на его прототип (или объект-прототип). Когда код пытается обратиться к свойству или методу объекта, JavaScript ищет это свойство или метод в самом объекте. Если он не может найти это свойство или метод в самом объекте, он ищет его в свойстве `proto` объекта. Если свойство или метод не найдены, JavaScript продолжает искать в цепочке прототипов, пока не будет найдено нужное свойство или метод.

Этот прототипный механизм наследования позволяет создавать и наследовать классы в JavaScript. В JavaScript нет классической системы классов, как в других языках, но объекты и функции могут использоваться для создания прототипного наследования.

Все объекты по умолчанию имеют прототип `Object.prototype`, который содержит некоторые общие методы, такие как `toString()`, `valueOf()` и т. Д. Вы можете установить прототип объекта на любой другой объект, используя метод `Object.create()` или свойство `__proto__`.<br><br>
### **Пример:**

<br>*Создаем объект `person`:*

```js
const person = {
  name: "Denis",
  age: 20,
  sayHello: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

console.log(person.name); // Denis
```

<br>*Создаем объект `newPerson`, которому в качестве `__proto__` задаем `person`:*

```js
const newPerson = {
  name: "Max",
  __proto__: person,
};
```

<br>*Смотрим результаты выводв в консоли:*

```js
console.log(newPerson.name); // Max
console.log(newPerson.age); // 20
newPerson.sayHello(); // Hello, Max!
```
<br> **ВАЖНО:** *Так как каждый объект в JavaScript имеет свойство `proto`, которое указывает на его прототип (или объект-прототип), мы делаем выводы, что прототипом объекта `person` является главный объект `Object`, а прототипом для newPerson является объект `person`:*<br>

```js
console.log(person.__proto__ === Object.prototype); // true
console.log(newPerson.__proto__ === person); // true
```
<br>**P.S.** *Свойство `__proto__` считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.*<br><br><br>
*Современные же методы это:*
<br>
1. `Object.create(proto[, descriptors])` – создаёт пустой объект со свойством `[[Prototype]]`, указанным как proto (может быть `null`), и необязательными дескрипторами свойств.

2. `Object.getPrototypeOf(obj)` – возвращает свойство `[[Prototype]]` объекта `obj` (то же самое, что и геттер `__proto__`).

3. `Object.setPrototypeOf(obj, proto)` – устанавливает свойство `[[Prototype]]` объекта `obj` как `proto` (то же самое, что и сеттер `__proto__`).<br><br><br><br>
## 2. Конструкторное наследование<br>

<br>**Конструкторное наследование** - это подход к созданию классов и объектов в JS, которое также использует механизм прототипов.<br><br>
**Конструкторное наследование в JavaScript** - это один из способов создания наследования между объектами. Он использует функции-конструкторы и их прототипы для передачи свойств и методов от одного объекта к другому.<br><br>

### **Пример:**

<br>*У нас есть функция-конструктор `Person`:*

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  console.log(
    "Hello, my name is " + this.name + " and I am " + this.age + " years old."
  );
};
```
<br>*Она создает объект `Person` с двумя свойствами: `name` и `age`, а также методом `sayHello()`.*<br><br>
*Теперь мы хотим создать объект `Student`, который будет наследовать свойства и методы объекта `Person`. Для этого мы можем использовать функцию-конструктор `Student` и поместить в нее вызов функции-конструктора `Person`:*<br>

```js
function Student(name, age, major) {
  Person.call(this, name, age);
  this.major = major;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayMajor = function () {
  console.log("My major is " + this.major + ".");
};
``` 
<br>*Эта функция-конструктор создает объекты Student с тремя свойствами: `name`, `age` и `major`. Также мы используем метод `call` для вызова функции-конструктора `Person` в контексте объекта `Student`.*
<br><br>
*После этого в прототип `Student` мы помещаем прототип `Person`, чтобы объекты `Student` могли наследовать методы объекта `Person`. Мы также устанавливаем конструктор `Student` в объект `Student.prototype`, чтобы он ссылался на правильный конструктор при создании новых объектов.*
<br><br>
*Наконец, мы добавляем метод `sayMajor()` в объект `Student.prototype`, который выводит информацию о специальности студента.*
<br><br>
*Теперь мы можем создать объект `Student` и использовать как свойства и методы, наследованные от объекта `Person`, так и свои собственные методы:*

```js
let student = new Student("John", 20, "Math");

student.sayHello(); // => Hello, my name is John and I am 20 years old.
student.sayMajor(); // => My major is Math.
```
<br><br><br>
## 3. Наследование через классы. <br>
<br>В JS нет классического наследования, поэтому для создания наследования применяется механизм *прототипов*. 

<br>**Классы** - это всего лишь синтаксический сахар, появившийся в JavaScript в новых стандартах ECMAScript 2015 и обеспечивающий удобный способ создания конструкторов и наследования. 

<br>Классы фактически создают функции-конструкторы, которые могут наследовать свойства и методы от других функций-конструкторов через прототипы.<br><br>
### **Пример:**

<br>*Создадим класс `Person`:*

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greating() {
    console.log(`Hello, ${this.name}!`);
  }
}
```
<br>*Этот код использует ключевое слово `extends` для наследования свойств и методов из класса `Person`. Конструктор класса `Employee` вызывает конструктор класса `Person` с помощью `super()`. При создании нового экземпляра используется ключевое слово `new`, как и в конструкторном наследовании:*

```js
class Employee extends Person {
  constructor(name, age, job) {
    super(name, age);
    this.job = job;
  }
}

let employee = new Employee("Dima", 38, "developer");
```
<br>*Смотрим результаты вывода в консоли:*

```js
console.log(employee.name); // Dima
console.log(employee.age); // 38
employee.greating(); // Hello, Dima!
```
<br><br><br>

## 4. Наследование через Object.setPrototypeOf().<br><br>

`Object.setPrototypeOf(obj, proto)` – устанавливает свойство `[[Prototype]]` объекта `obj` как `proto` (то же самое, что и сеттер `__proto__`). <br><br>

### **Пример:**

<br>*Создадим объект `animal` и объект `rabbit`:*
```js
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
```
 <br>Это пример установки прототипа объекта с помощью метода `Object.setPrototypeOf()`. Этот метод устанавливает объект-прототип для любого объекта.
<br><br> 
## Важно:
использование  `Object.setPrototypeOf()` не рекомендуется из-за негативного влияния на производительность.

