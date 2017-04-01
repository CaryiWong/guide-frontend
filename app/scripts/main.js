/**
 * Created by Administrator on 2017/3/29.
 */
var ui_config = {loading: true, error: true};

var args = getArgs();
var pid = args.pid || '';

var pre_pid = Cookies.get('pre_pid');

var $preLevel = $('.pre-level');

function get_guide_list(pid){
    return server('guide/get_list_pid.qh', {pid: pid}, ui_config).then((data) => {
        var $memberList = $('.item-list');
        data.forEach(function(item){
            //item.pid ? $preLevel.attr('href', 'index.html?pid=' + '') : '';
            var html = '<a href=\"index.html?pid=' + item.id + '\" class="list-item alert bg-green-light border-green">' +
                '<h2 class="number"><i class="icon-book"></i> ' + item.num +'</h2>' +
                '<h2 class="text-more number">' + item.title + '</h2>' +
                '<p class="text-more"><strong>描述：</strong>' + item.text + '</p>' +
                '<p class="text-more"><strong>创建时间：</strong>' + item.createtime + '</p>' +
                '<p class="text-more"><strong>修改时间：</strong>' + item.updatetime + '</p>' +
                '</a>';
            $memberList.append(html);
        })
    });
}

function logout(){
    return server('user/login_out.qh',{},ui_config);
}

var user = {
    username: Cookies.get('username'),
    userId: Cookies.get('userId')
};

if(!user.userId){
    notice.push_error('请先登录！');
    //setTimeout(function(){
    //    window.location.href="login.html"
    //},1000)
}else {
    $('.username').html(user.username);
    get_guide_list(pid)
}

var $logoutBtn = $('.logout-btn');
$logoutBtn.on('click',function(){
    if(confirm('确认退出？')){
        logout().then(function(){
            Cookies.remove('username');
            Cookies.remove('userId');
            window.location.href="login.html"
        })
    }
});

$preLevel.on('click',function(){
    history.back()
})