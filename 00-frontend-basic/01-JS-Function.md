
# JavaScript Function

函数是JavaScript中的一等公民；
- 函数可以被视为是一种对象；（而非对象内的一个属性）
- 对象是一个值（value），函数也是一个值；

因为函数是值，所以：
- 可以使用变量来存储一个函数；
- 可以将函数作为参数传递给另一个函数；
- 可以将函数作为函数的返回值；
- 在函数上调用另一个函数；


## 1. 使用变量来存储一个函数

```js
//使用变量来存储一个函数
const add = (a, b) => a + b;

const counter = {
    count: 0,
    add: function(value) { this.count += value; }
}
```

## 2. 将函数作为参数传递给另一个函数
```js
// 将函数作为参数传递给另一个函数
const greet = () => console.log('hello');
btnClose.addEventListener('click', greet);
```


## 3. 将函数作为函数的返回值

```js
// 作为函数的返回值
const counter = () => {
    let count = 0;
    return function () {
        return count++;
    };
}
const c = counter();
c();
```

## 4. 函数上调用另一个函数
就像前面说的，函数是一种对象，那么它就有一些原生方法。

比如：
- `bind()`
- `call()`
- `apply()`
- `toString()`
```js
'use strict'
let person = {
    name: "John",
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    }
};
let child = {
    name: "Mike"
};

let boundGreet = person.greet.bind(child);
boundGreet();   // Hello, my name is Mike

const greet = person.greet;
greet.call(child);      // Hello, my name is Mike
greet.apply(person);    // Hello, my name is Mike
```
## 5. Higher-order function

A function that receives another function as an argument or returns another function as a result is called a higher-order function.

receives another function as an argument
```js
const list = [1, 2, 3, 4]
const newList = list.map(x => x * 2)
```

returns another function as a result
```js
const counter = () => {
    let count = 0;
    return function () {
        return count++;
    };
}
const increment = counter();

console.log(increment.toString()); // function () {return count++;}
```

## 6. Function原生函数

当函数由对象调用时，this指向对象；

当函数独立执行时，this指向window对象：[object global]，window对象的this.name为 undefined
```js
let person = {
    name: "John",
    greet: function () {
        console.log(`Hello, ${this.name}`);
    }
};
person.greet();    // Hello, John

// 函数是独立的对象，不再依附于person，this指向为
const greet = person.greet;
greet();      // Hello, undefined
```

### Call & Apply
改造一下，greet函数增加一个参数：
```js
const now = new Date().toLocaleDateString();
let person = {
    name: "John",
    greet: function (time) {
        console.log(`Hello, ${this.name}  at ${time}`);
    }
};
person.greet(now);    // Hello, John


// 函数是独立的对象，不再依附于person，this指向为
const greet = person.greet;
greet(now);      // Hello, undefined


let child = {
    name: "Mike"
};
greet.call(child, now);      // Hello, Mike  at 2024/11/30
greet.apply(person, [now]);    // Hello, John  at 2024/11/30
```

call和apply函数定义中，第一个参数是：this；

区别：
- call依次传入参数；apply传入数组参数；


```ts
interface Function {
    /**
     * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
     * @param thisArg The object to be used as the this object.
     * @param argArray A set of arguments to be passed to the function.
     */
    apply(this: Function, thisArg: any, argArray?: any): any;

    /**
     * Calls a method of an object, substituting another object for the current object.
     * @param thisArg The object to be used as the current object.
     * @param argArray A list of arguments to be passed to the method.
     */
    call(this: Function, thisArg: any, ...argArray: any[]): any;

    // ...
}
```


### Bind

```js
const now = new Date().toLocaleDateString();
let person = {
    name: "John",
    greet: function (time) {
        console.log(`Hello, ${this.name}  at ${time}`);
    }
};
let child = {
    name: "Mike"
};

const childGreet = greet.bind(child);
childGreet(now);

// const childGreet = greet.bind(child, now);  创建时传入参数now
```

## 7. IIFE
Immediately Invoked Function Expression
```js
(function () {
    var hiddenVariable = "This is a hidden variable";
    console.log("Hello World");
})();

// can not access hiddenVariable
console.log(hiddenVariable);
```



## 7. Closures

[Closures](https://www.bilibili.com/video/BV1vA4y197C7?spm_id_from=333.788.videopod.episodes&vd_source=ce67cf212f4a949cf75348b5404c5e27&p=128)

闭包的意义：
- 数据的隐藏和封装：通过闭包来创建私有的变量、函数，暴漏特定的函数，防止外部以不期望的方式访问数据。
- 异步编程：捕获环境变量，以用于异步编程和状态管理；

```js
const counter = () => {
    let count = 0;
    return () => {
        count++;
        console.log(count);
    }
}

const c1 = counter();
c1(); // 1
c1(); // 2

// 新的闭包被创建，其捕获的变量也是新创建的
const c2 = counter();
c2(); // 1
```

异步执行回调函数
```js
const asyncCounter = (callback) => {
    let count = 0;
    return () => {
        count++;
        setTimeout(() => {
            callback();
            console.log(count);
        }, 1000);
    }
};

const ac1 = asyncCounter(() => console.log('Time up'));
ac1();

console.log("wait for async function");
```