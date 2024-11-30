// A function
const Person = function (name, age) {
    this.name = name;
    this.age = age;
};

const john = new Person("John", 30);
console.log(john.__proto__);  // {}

Person.prototype.getAge = function () { return this.age; };

console.log(john.__proto__); // { getAge: [Function (anonymous)] }

john.getAge(); // 30

console.log(john.__proto__ === Person.prototype);  //  true