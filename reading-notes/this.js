
const person = {
    firstName: "John",
    sayHi() {
        console.log(`Hi, my name is ${this.firstName}`);
    },
};
const greet = person.sayHi;
// person.sayHi();
greet(); // this refers to the global function on this instance

setTimeout(function () {
    person.sayHi();
}, 1000);

setTimeout(person.sayHi.bind(person), 1000);

function func() {
    "use strict"
    console.log(this === global)
}

func()

// ref https://egghead.io/lessons/javascript-this-in-method-calls
