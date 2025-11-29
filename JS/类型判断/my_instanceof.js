function myinstanceof(L, R) {
    if(typeof(L) != 'object' && typeof(L) != 'function' || L == null){
        return false;
    }
    let proto = L.__proto__;
    while(proto != null){ 
        if(proto == R.prototype){
            return true;
        } 
        proto = proto.__proto__;
    }
    return false;
}
console.log(myinstanceof([], Array));  // true
console.log(myinstanceof([], Object)); // true
console.log(myinstanceof('hello', String)); // false