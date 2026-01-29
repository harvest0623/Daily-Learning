function identity<T>(value: T) {
    // if (typeof value in ['string', 'number', 'boolean']) {
    //     return value;
    // }
    return value;
}
identity<number>(100);

function identity2<T, U>(value: T, msg: U): T {
    console.log(msg);
    return value;
}
identity2<number, string>(100, 'hello');

let arr: Array<number> = [1, 2, 3];
let arr2: Array<number | string> = [1, 2, 3, 'hello'];