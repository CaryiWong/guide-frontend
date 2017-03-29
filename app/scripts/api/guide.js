/**
 * Created by Administrator on 2017/3/29.
 */
import cookie from 'js-cookie';
import server from 'server/resource';
export var ui_config = {loading: true, error: true};

export function login(username,userpwd){
    return server.post('user/login_user.qh', {username,userpwd},ui_config);
}
