
/**
 * Created by Administrator on 2017/3/29.
 */
var ui_config = {loading: true, error: true};

function login(username,userpwd){
    var data = {
        username: username,
        userpwd: userpwd
    };
    return server('user/login_user.qh', data, ui_config);
}

var $btn = $('.submit-button');
$btn.on('click',function(){
    var username = $('#username').val();
    var userpwd = $('#userpwd').val();
    login(username,userpwd).then(function(user){
        Cookies.set('username',user.username, { expires: 1});
        Cookies.set('userId',user.id, { expires: 1});
        notice.push_success('登录成功！');
        setTimeout(function(){
            window.location.href="index.html"
        },1000)
    });
});