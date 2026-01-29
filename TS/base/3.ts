let isDone: boolean = false;
let count: number = 123;
let str: string = 'Trae';

const symbol: symbol = Symbol();
let obj: object = {
    [symbol]: 'Trae'
};

let list: number[] = [1, 2, 3];

enum Color {
    Red,
    Green,
    Blue
}

let color: Color = Color.Red;

let notSure: any = 10;
notSure = '123';

let value: unknown = 10;
value = '123';

let abc: string = 'hello';
// abc = value;   报错
abc = notSure;

let tuple: [number, string] = [10, 'hello'];

function user1(): number {
    return 123;
}
function user2(): Function {
    return function fn(): number {
        return 123;
    }
}
function user3(): void {}
// 报错
// function user2(): string {
//     return 123;
// }

let u: undefined = undefined;
let n: null = null;

let s: symbol = Symbol();