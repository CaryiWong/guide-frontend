function serialize(obj, prefix) {
    var str = [];
    for(var p in obj) {
        var value = obj[p];
        if (obj.hasOwnProperty(p) && (value !== null && value !== undefined)) {
            var k = prefix ? prefix + "[" + p + "]" : p;
            str.push(typeof value == "object" ?
            serialize(value, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(value));
        }
    }
    return str.join("&");
}

export function get(url, data = {}) {
    return fetch(url + '?' + serialize(data), {
        headers: {
            'Accept': 'application/json'
        },
        method: 'GET'
    });
}

export function post(url, data = {}){
    return fetch(url, {
        headers: {
            'Accept': 'application/json, text/javascript, */*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'POST',
        body: serialize(data)
    });
}

export function form(url, data){
    var form_data = new FormData();
    Object.keys(data).map(function (key) {
        var value = data[key];
        if(value !== null && value !== undefined){
            form_data.append(key, value);
        }
    });
    return fetch(url, {
        method: 'POST',
        body: form_data
    });
}

export default {
    get,
    post,
    form
};
