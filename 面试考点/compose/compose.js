let middleware = [];

function A (ctx, next) {
    console.log('A start');
    next();
    console.log('A end');
}

function B (ctx, next) {
    console.log('B start');
    next();
    console.log('B end');
}

function C (ctx, next) {
    console.log('C start');
    next();
    console.log('C end');
}

middleware.push(A);
middleware.push(B);
middleware.push(C);

const fn = compose(middleware);
fn({});

function compose (middleware) {
    return function (ctx = {}) {
        function dispatch (i) {
            if (i >= middleware.length) {
                return;
            }

            const nextFn = () => {
                dispatch(i + 1);
            }
            middleware[i](ctx, nextFn);
        }
        dispatch(0);
    };
}