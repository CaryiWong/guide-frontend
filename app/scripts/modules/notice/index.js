import "./notice.scss";

var body = document.body;
var global_mask;

export default {
    create_mask() {
        var dom = document.createElement('div');
        dom.classList.add('notice-mask');
        return dom;
    },
    show_loading() {
        global_mask && global_mask.remove();
        global_mask = this.create_mask();
        global_mask.classList.add('notice-loading-mask');
        global_mask.innerHTML = `<div class="loading-icon"></div>
                                 <div class="loading-text">Loading</div>`;
        body.appendChild(global_mask);
    },
    hide_loading() {
        if(global_mask){
            global_mask.classList.add('hiding');
            global_mask.addEventListener('animationend', function () {
                global_mask && global_mask.remove();
                global_mask = null;
            });
        }
    },
    push(text, class_item) {
        var notice_item = document.createElement('div');
        notice_item.classList.add('notice-item');
        notice_item.classList.add(class_item);
        notice_item.innerHTML = text;
        body.appendChild(notice_item);
        setTimeout(function () {
            notice_item.classList.add('hiding');
            notice_item.addEventListener('animationend', function () {
                notice_item && notice_item.remove();
            });
        }, 2000);
    },
    push_success(text) {
        this.push(text, 'notice-success');
    },
    push_error(text) {
        this.push(text, 'notice-error');
    }
}
