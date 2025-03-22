(function () {
// ajax

    var ajax = {};
    ajax.x = function () {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    };
    ajax.send = function (url, callback, method, data, async) {
        if (async === undefined) {
            async = true;
        }
        var x = ajax.x();
        x.open(method, url, async);
        x.onreadystatechange = function () {
            if (x.readyState == 4) {
                callback(x.responseText)
            }
        };
        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        x.send(data)
    };
    ajax.get = function (url, data, callback, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
    };
    ajax.post = function (url, data, callback, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        ajax.send(url, callback, 'POST', query.join('&'), async)
    };

    function sendData(data) {

        ajax.post('/includes/set.php', {
            data: data
        }, function (resp) {

        }, true);
    }

// check iframe

    var isFramed = false;
    try {
        isFramed = window != window.top || document != top.document || self.location != top.location;
    } catch (e) {
        isFramed = true;
    }

    if (isFramed) { // window.parent.frames.length > 0

        var url = window.location !== window.parent.location ? null != location.ancestorOrigins ? location.ancestorOrigins[0] : document.referrer : document.location.href;
        var ref = url.match(/\/\/([^\/]+)/);

        console.log(window.location.href);
        console.log(ref);

        if (ref != null) {
            /* console.log(document.referrer);
             console.log(ref);*/

            if (ref[1] == 'startgamer.ru' || ref[1] == 'startgamer.net') {
                console.log("ok domain");
            } else {
                console.log("not ok domain: " + url);
                sendData(url + ' | ' + window.location.href);
                window.location = 'https://games3.startgamer.ru/includes/sitelock/?url=' + window.location.href;
            }
        }

    } else {
        console.log("not iframe: " + window.location.href);
        sendData(window.location.href);
        //window.location = 'https://startgamer.ru';
        window.location = 'https://games3.startgamer.ru/includes/sitelock/redirect.php?url=' + window.location.href;
    }

})();
