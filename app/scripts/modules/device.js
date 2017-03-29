var ua = window.navigator.userAgent.toLowerCase(),
    device = {
        android: false,
        ios: false,
        weixin: false
    };
if (ua.search(/android/) >= 0) {
    device.android = true;
    device.name = 'android';
    device.version = parseFloat((ua.match('android ([0-9.]+)') || [])[1]);
    document.documentElement.classList.add('android-body');
}
if (ua.search(/iphone|ipod|ipad/) >= 0) {
    device.ios = true;
    device.name = 'ios';
    device.version = parseFloat(ua.match(/os (\d)/));
    document.documentElement.classList.add('ios-body');
}
if (ua.search(/micromessenger/) >= 0) {
    device.weixin = true;
    document.documentElement.classList.add('weixin-body');
}
if (device.android && device.version <= 6) {
    device.androidVunit = true;
    document.documentElement.classList.add('android-vunit');
}
if (device.android && device.version < 4.4) {
    device.androidFlex = true;
    document.documentElement.classList.add('android-flex');
}

device.title = function (title) {
    document.title = title;
    if (device.ios) {
        var iframe = document.createElement('iframe');
        iframe.classList.add('normal-iframe');
        iframe.src = '/images/icons/logo.png';
        iframe.style.opacity = 0;
        iframe.onload = function () {
            setTimeout(function () {
                iframe.onload = undefined;
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }
}

var origin_title = document.documentElement.querySelector('title').innerText;
device.restore_title = function () {
    device.title(origin_title);
}

module.exports = device;
