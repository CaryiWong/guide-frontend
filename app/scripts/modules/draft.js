export default {
    get(id) {
        var obj = localStorage.getItem(id);
        if(obj){
            obj = JSON.parse(obj);
        }
        return obj;
    },
    set(id, value) {
        localStorage.setItem(id, JSON.stringify(value));
    },
    remove(id) {
        localStorage.removeItem(id);
    }
}
