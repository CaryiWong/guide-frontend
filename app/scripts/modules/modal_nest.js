import $ from 'jquery';

var $body = $('body');
$(document).on('show.bs.modal', '.modal:not(.in)', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    requestAnimationFrame(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    });
});

$(document).on('hidden.bs.modal', '.modal', function (event) {
    if($('.modal:visible').length > 0){
        $body.addClass('modal-open');
    } else {
        $body.removeClass('modal-open');
    }
});
