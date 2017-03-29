/**
 * Created by Administrator on 2017/2/10.
 */
export function to_array(value){
    if(typeof value === 'string' && value.length){
        return value.split(',')
    }
}

export function split_tags(value,classname){
    if(value){
        var array = value.split(',');
        var html = "";
        for(var i = 0 ;i< array.length ; i++){
            var class_def = classname ? "class='"+ classname +"'" : '';
            html += '<span '+ class_def +'>' + array[i] + '</span>'
        }
        return html
    }
}

export function head_img(value) {
    return value || '/images/default_head.jpg';
}

export function fix_num(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}