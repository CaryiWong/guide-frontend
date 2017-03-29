var is_dragging;
var html_dom = document.documentElement;
var body_dom = document.body;
var view_height = window.innerHeight;
var up_domain = .05;
var down_domain = .95;
var is_scrolling = false;
var step = 15;
var interval = 20;
var timer;

function scroll_up() {
    is_scrolling = true;
    timer = setTimeout(function () {
        body_dom.scrollTop -= step;
        scroll_up();
    }, interval);
}

function scroll_down() {
    is_scrolling = true;
    timer = setTimeout(function () {
        body_dom.scrollTop += step;
        scroll_down();
    }, interval);
}

function moving(event) {
    var mouse_position = event.clientY / view_height;
    if(!is_scrolling){
        if(mouse_position < up_domain){
            scroll_up();
        } else if(mouse_position > down_domain){
            scroll_down();
        }
    } else
    if(mouse_position > up_domain
        && mouse_position < down_domain){
        clearTimeout(timer);
        is_scrolling = false;
    }
}

export default {
    start() {
        body_dom.addEventListener('mousemove', moving);
    },
    stop() {
        clearTimeout(timer);
        is_scrolling = false;
        body_dom.removeEventListener('mousemove', moving);
    }
}
