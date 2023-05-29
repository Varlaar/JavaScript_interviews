"use strict";

// Event loop

console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

const myPromise = new Promise((resolve, reject) => {
  console.log(3);
  resolve(4);
}).then((value) => console.log(value));

console.log(5);
