/**
 * Created by Caryi on 2016/3/18.
 */
import $ from 'jquery';
import compressImg from '../lib/image.compress';
export const root = (process.env.NODE_ENV === 'development' ? 'http://test-group.yi-gather.com/api/' :
'http://' + window.location.hostname + '/api/');
var imgUrl = 'http://www.yi-gather.com/cms/tools/file_upload.cms';
export function server(obj) {
    var dtd = $.Deferred();
    var url = obj.url;
    if (!/http/.test(url)) {
        url = root + url;
    }
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'post',
        dataType: 'json',
        data: obj.data,
        crossDomain: true,
    }).success(function (response) {
        if (response.errcode === 0) {
            dtd.resolve(response);
        } else {
            dtd.reject(response.errormsg || response.errmsg);
        }
    }).fail(function (err) {
        dtd.reject(err.errormsg || err.errmsg);
    });

    return dtd.promise();
}

export function uploadImg(file) {
    var dtd = $.Deferred();
    var url = imgUrl;
    if (file) {
        if (typeof FormData === "undefined") {
            throw new Error("FormData is not implemented");
        }
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200 && request.responseText !== '') {
                var data = JSON.parse(request.responseText).data;
                dtd.resolve(data);
            } else if (request.status !== 200 && request.responseText) {
                var error = JSON.parse(request.responseText);
                dtd.reject(error)
            }
        };
        var formdata = new FormData();
        if (typeof (file) === 'object') {
            formdata.append('file', file);
            request.send(formdata);
        } else {
            compressImg(file, 960, function (src) {
                formdata.append('img', src);
                request.send(formdata);
            });
        }
        return dtd.promise();
    }
}


//注册http://192.168.1.3:8080/community/user/create_user.shtml?username=caryi&nickname=caryinick
// &password=e10adc3949ba59abbe56e057f20f883e&telnum=12345678910

