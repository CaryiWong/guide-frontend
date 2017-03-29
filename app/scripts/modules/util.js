var util = {
    getArgs: function () {
        var args = {},
            query = location.search.substring(1),
            pairs = query.split("&");
        for (var i = 0; i<pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0, pos),
                value = pairs[i].substring(pos + 1);
            value = decodeURIComponent(value);
            args[argname] = value;
        }
        return args;
    },
    isNil: function (value) {
        return value === null || value === undefined;
    }
};
export default util;
