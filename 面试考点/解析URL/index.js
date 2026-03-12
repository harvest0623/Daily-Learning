const url = 'https://www.baidu.com/order/home?user=Tom&id=123&city=南昌&id=56';

const output = {
    protocol: 'https',
    hostname: 'www.baidu.com',
    path: '/order/home',
    query: {
        user: 'Tom',
        id: [123, 56],
        city: '南昌'
    }
}

function urlParser(url) {
    const protocalArr = url.split('://');
    const protocol = protocalArr[0];
    const hostname = protocalArr[1].split('/')[0];
    const path = protocalArr[1].split(hostname)[1].split('?')[0];
    const queryArr = protocalArr[1].split(hostname)[1].split('?')[1].split('&');
    const queryObj = {};

    queryArr.forEach(item => {
        const [key, value] = item.split('=');
        if (queryObj[key]) {
            if (Array.isArray(queryObj[key])) {
                queryObj[key].push(value);
            } else {
                queryObj[key] = [queryObj[key], value];
            }
        } else {
            queryObj[key] = value;
        }
    })
    
    return {
        protocol,
        hostname,
        path: path,
        query: queryObj
    }
}
console.log(urlParser(url));