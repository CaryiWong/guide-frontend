/**
 * Created by Caryi on 2016/3/18.
 */
var server_root = (/localhost/.test( window.location.host ) ? 'http://120.25.244.174:8880/in_guide/' :
'http://' + window.location.hostname + '/in_guide/');
console.log(server_root);

function server(url,data,config) {
    config = config || {};
    var dtd = $.Deferred();
    if (!/http/.test(url)) {
        url = server_root + url;
    }
    function finish() {
        if(config.loading){
            clearTimeout(loading_timer);
            notice.hide_loading();
        }
    }

    var loading_timer;
    if(config.loading){
        loading_timer = setTimeout(function () {
            notice.show_loading();
        }, 500);
    }
    $.ajax({
        //xhrFields: {
        //    withCredentials: true
        //},
        url: url,
        method: 'post',
        dataType: 'json',
        data: data,
        //crossDomain: true
    }).success(function (response) {
        finish();
        if (response.errcode === "10000") {
            dtd.resolve(response.data);
        } else {
            var errmsg = response.msg || '请求失败!';
            var error = config.error;
            error && notice.push_error(
                typeof error === 'string' ? error : errmsg);
            dtd.reject(errmsg);
        }
    }).fail(function (err) {
        var errmsg = err.msg || '请求失败!';
        var error = config.error;
        error && notice.push_error(
            typeof error === 'string' ? error : errmsg);
        finish();
        dtd.reject(errmsg);
    });
    return dtd.promise();
}

function uploadFile(url,file,config) {
    config = config || {};
    var dtd = $.Deferred();
    function finish() {
        if(config.loading){
            clearTimeout(loading_timer);
            notice.hide_loading();
        }
    }
    var loading_timer;
    if(config.loading){
        loading_timer = setTimeout(function () {
            notice.show_loading();
        }, 500);
    }
    if (file) {
        if (typeof FormData === "undefined") {
            throw new Error("FormData is not implemented");
        }
        var request = new XMLHttpRequest();
        request.open('POST', server_root + url);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200 && request.responseText !== '') {
                var data = JSON.parse(request.responseText).data;
                finish();
                dtd.resolve(data);
            } else if (request.status !== 200 && request.responseText) {
                var errmsg = JSON.parse(request.responseText) || '请求失败!';
                var error = config.error;
                error && notice.push_error(
                    typeof error === 'string' ? error : errmsg);
                finish();
                dtd.reject(errmsg)
            }
        };
        var formdata = new FormData();
        formdata.append('file', file);
        request.send(formdata);
        return dtd.promise();
    }
}

