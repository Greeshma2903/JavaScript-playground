"use strict";

// Functions ----------------------------------------------------
// getNamaste();
// var x = 7;

// Function declaration 👇
// This is hoisted. So, we can call this function before declaring it.
/**
function getNamaste() {
  console.log("Namaste");
}
*/

// Function expression 👇
// This is not hoisted. So, we can't call this function before declaring it.
/**
const getNamaste = function () {
  console.log("Namaste");
};
 */

// Map, Reduce, Filters -----------------------------------------
/**
const users = [
  { name: "John", age: 34 },
  { name: "Amy", age: 20 },
  { name: "cam", age: 34 },
  { name: "Doe", age: 45 },
];

// Convert the users array to an array of age with the count of each age.
const ageCount = users.reduce((acc, user) => {
  if (acc[user.age]) {
    acc[user.age] += 1;
  } else {
    acc[user.age] = 1;
  }
  return acc;
}, {});

// Convert the users array to an array of names, with age less than 30.
const firstNameLess30 = users.reduce((acc, user) => {
  if (user.age < 30) {
    acc.push(user.name);
  }

  return acc;
}, []);

console.log(firstNameLess30);
 */

// Generators --------------------------------------------------
/**
function* simpleGenerator() {
  // '*' is used to define a generator function.
  yield 1; // generator returns the value after the yield keyword.
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true } -- when the generator function ends yielding values.

// * {value, done} is the return object of the generator function. The 'value' field returns the value at which generator function is paused. The 'done' field returns true when the generator function is done yielding values.

// Infinite generator function
function* infinteGenFuntion() {
  let i = 0;

  while (true) {
    let inc = yield i; // The value passed to the 'next()' method is returned by the 'yield' keyword.
    if (inc) {
      i += inc;
    } else {
      i++;
    }
  }
}

const infinteGen = infinteGenFuntion();
console.log(infinteGen.next()); // { value: 0, done: false } -- Argument passed to next() is ignored for the first time.
console.log(infinteGen.next()); // { value: 1, done: false }
console.log(infinteGen.next(3)); // { value: 4, done: false }
console.log(infinteGen.next()); // { value: 5, done: false }
console.log(infinteGen.return()); // { value: undefined, done: true } -- return() method is used to stop the generator function.
 */

// call, apply and bind methods --------------------------------
/**
// call() method
const user = {
  firstName: "Amy",
  lastName: "Doe",
  fullName: function (age, city) {
    console.log(this.firstName);
    return this.firstName + " " + this.lastName + " " + age + " " + city;
  },
};

const profile = {
  firstName: "John",
  lastName: "Doe",
  gender: "M",
};

const value = user.fullName.call(profile, 30, "New York"); // "John Doe"; It returns the value of the function.
console.log("Call method --", value);

// apply() method
const value1 = user.fullName.apply(profile, [30, "New York"]); // "John Doe"; It returns the value of the function.
console.log("Apply method --", value1);

// * The difference between the call() and apply() method is that the call() method takes the arguments as a list of arguments, whereas the apply() method takes the arguments as an array.

// bind() method
const profileNew = user.fullName.bind(profile, 30, "New York"); // It returns the function. Hence you can save the copy of the function and call it later. The function is referenced to the object passed in the bind method.

console.log("Bind Method --", profileNew()); // "John Doe"; It returns the value of the function.
console.log(profileNew.name); // returns the name of the function it's bound too
 */

// Polyfill for bind() method -----------------------------------

/**
// .bind() might not be available in some older browsers. So, we can create a polyfill for the bind() method. The Function.prototype can be used for making the said function available to all the functions.

const profile = {
  firstName: "Amy",
  lastName: "Doe",
};

function printName(age, city) {
  console.log(
    this.firstName +
      " " +
      this.lastName +
      " is of " +
      age +
      ". Lives in " +
      city
  );
}

// Using the bind() method
const printNameBind = printName.bind(profile);
printNameBind(29, "New York");

// Polyfill for bind() Method
Function.prototype.mybind = function (...args) {
  let context = this,
    params = args.slice(1);

  return function (...args1) {
    // borrow exisiting function and return the value (using call method)
    context.call(args[0], [...params, ...args1]);
  };
};

const printNamePoly = printName.bind(profile);
printNamePoly(20, "Agra");
 */

// Debouncing ---------------------------------------------
/**
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

const handleInput = debounce((ev) => {
  // Do stuff with the event!
  console.log(ev.target.value);
}, 250);

document
  .getElementsByClassName("text-input")[0]
  .addEventListener("input", handleInput);
 */

// Throttling ---------------------------------------------
/**
const throttle = (callback, pause) => {
  let timeout = null;
  return (...args) => {
    if (!timeout) {
      callback(...args);
      timeout = setTimeout(() => (timeout = null), pause); // throttle the event triggers
    }
  };
};

const handleClickEvent = throttle((ev) => {
  console.log(ev.target);
}, 2000);

document
  .querySelector(".click-btn")
  .addEventListener("click", handleClickEvent);
 */
