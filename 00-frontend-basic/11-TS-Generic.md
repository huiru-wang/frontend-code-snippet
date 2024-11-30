
# Generic

- 代码重用
- 类型安全
- 多态

```ts
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}
```

泛型的默认类型
```ts
function defaultValue<T = string>(arg: T): T {
    return arg;
}
```

## Function Generic

```ts
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<number>(5);
let output2 = identity<string>("Hello");
let output3 = identity<{ name: string }>({ name: "Alice" });
```

## Class Generic

```ts
class Box<T> {
    constructor(private content: T) {}
    public getContent(): T {
        return this.content;
    }
}
let numberBox = new Box<number>(5);
let stringBox = new Box<string>("Hello");
console.log(numberBox.getContent());
console.log(stringBox.getContent());
```

## Interface Generic

```ts
interface Adder<T> {
    add(a: T, b: T): T;
}
class NumberAdder implements Adder<number> {
    add(a: number, b: number): number {
        return a + b;
    }
}
class StringAdder implements Adder<string> {
    add(a: string, b: string): string {
        return a + b;
    }
}
let numberAdder = new NumberAdder();
let stringAdder = new StringAdder();
console.log(numberAdder.add(3, 5));
console.log(stringAdder.add("Hello", " World"));
```
