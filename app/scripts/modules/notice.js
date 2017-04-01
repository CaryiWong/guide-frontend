var body = document.body;
var global_mask;

var notice ={
    create_mask: function() {
        var dom = document.createElement('div');
        dom.className += ' notice-mask';
        return dom;
    },
    show_loading: function() {
        global_mask && global_mask.remove();
        global_mask = this.create_mask();
        global_mask.className += ' notice-loading-mask';
        global_mask.innerHTML = "<div class=\"loading-icon\"></div><div class=\"loading-text\">正在加载 ...</div>";
        body.appendChild(global_mask);
    },
    hide_loading: function() {
        if(global_mask){
            global_mask.className += ' hiding';
            if(global_mask.addEventListener){
                global_mask.addEventListener('animationend', function () {
                    global_mask && global_mask.remove();
                    global_mask = null;
                });
            }else{
                global_mask && body.removeChild(global_mask);
                global_mask = null;
            }

        }
    },
    push: function(text, class_item) {
        var notice_item = document.createElement('div');
        notice_item.className += ' notice-item ';
        notice_item.className += class_item;
        notice_item.innerHTML = text;
        body.appendChild(notice_item);
        setTimeout(function () {
            notice_item.className += ' hiding';
            if(document.addEventListener && notice_item.addEventListener){
                notice_item.addEventListener('animationend', function () {
                    notice_item && notice_item.remove();
                });
            }else{
                notice_item && body.removeChild(notice_item);
            }

        }, 2000);
    },
    push_success: function(text) {
        this.push(text, 'notice-success');
    },
    push_error: function(text) {
        this.push(text, 'notice-error');
    }
};
