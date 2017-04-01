/**
 * Created by Administrator on 2017/3/29.
 */
var ui_config = {loading: true, error: true};

function login(username,userpwd){
    return server.post('user/login_user.qh', {username,userpwd},ui_config);
}
