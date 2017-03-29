
/**
 * Created by Administrator on 2017/3/29.
 */

import {login} from 'api/guide'
import $ from 'jquery'

var testObject = {};
if (!(Object.setPrototypeOf || testObject.__proto__)) {
    var nativeGetPrototypeOf = Object.getPrototypeOf;

    Object.getPrototypeOf = function(object) {
        if (object.__proto__) {
            return object.__proto__;
        } else {
            return nativeGetPrototypeOf.call(Object, object);
        }
    }
}

var $btn = $('.submit-button');
$btn.on('click',function(e){
    e.preventDefault();
    console.log( 'click')
});