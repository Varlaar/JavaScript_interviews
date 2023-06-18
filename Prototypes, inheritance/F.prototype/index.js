"use strict";

// ***** F.prototype *****

// Пример 1
const user = {
  name: "David",
  job: "developer",
};

function Admin(name, isAdmin) {
  this.name = name, 
  this.isAdmin = isAdmin
}

Admin.prototype = user;

const admin = new Admin("Denis", true);

console.log(admin.name); // Denis
console.log(admin.isAdmin); // true
console.log(admin.job); // developer

console.log(admin.prototype === user.prototype); // true
console.log(admin.__proto__=== user); // true
