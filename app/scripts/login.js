
/**
 * Created by Administrator on 2017/3/29.
 */
var $ = require('jquery');
var $btn = $('.submit-button');
$btn.on('click',function(){
    console.log( 'click');
    alert('click')
});