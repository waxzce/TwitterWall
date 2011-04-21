$.extend({
    URLEncode: function(c) {
        var o = '';
        var x = 0;
        c = c.toString();
        var r = /(^[a-zA-Z0-9_.]*)/;
        while (x < c.length) {
            var m = r.exec(c.substr(x));
            if (m != null && m.length > 1 && m[1] != '') {
                o += m[1];
                x += m[1].length;
            } else {
                if (c[x] == ' ') o += '+';
                else {
                    var d = c.charCodeAt(x);
                    var h = d.toString(16);
                    o += '%' + (h.length < 2 ? '0': '') + h.toUpperCase();
                }
                x++;
            }
        }
        return o;
    },
    URLDecode: function(s) {
        var o = s;
        var binVal,
        t;
        var r = /(%[^%]{2})/;
        while ((m = r.exec(o)) != null && m.length > 1 && m[1] != '') {
            b = parseInt(m[1].substr(1), 16);
            t = String.fromCharCode(b);
            o = o.replace(m[1], t);
        }
        return o;
    }
});






// my script now
 (function($) {
    $.fn.db = new Array();
    $.fn.hearbeatTime = 5000;
    $.fn.angle = 9;
    $.fn.twrequest = 'rpp=80&q=' + $.URLEncode($.query.get('twrequest'));
    $.fn.hashtag = $.query.get('hashtag');
    $.fn.img = $.query.get('img');
    $.fn.colorpseudo = '#'+$.query.get('colorpseudo');
    $.fn.colorlink = '#'+$.query.get('colorlink');
    $.fn.colorborder = '#'+$.query.get('colorborder');

    $.fn.log = function(msg) {
        if (console) {
            console.log(msg);
        }
    };
    $.fn.feedTheDB = function()
    {
        $.ajax({
            url: ($.fn.feedTheDB.lastcall.refresh_url ? "https://search.twitter.com/search.json" + $().feedTheDB.lastcall.refresh_url: "https://search.twitter.com/search.json?" + $().twrequest),
            dataType: "jsonp",
            success: function(result) {
                for (i in result.results) {
                    var r = result.results[i];
                    r.played = 0;
                    $().db.push(r);
                }
                $.fn.feedTheDB.lastcall = result;
                $().log($.fn.feedTheDB.lastcall.refresh_url);
                $().log(result);
            }
        });
        $().log("another feed");
    };
    $.fn.feedTheDB.lastcall = {};

    $.fn.feedTheDB.sortfunction = function(a, b) {
        var playcom = (a.played - b.played);
        if (playcom == 0) {
            var playcom = (new Date(b.created_at)).getTime() - (new Date(a.created_at)).getTime();
        }
        return playcom;
        //causes an array to be sorted numerically and ascending
    };
    $.fn.sortDB = function() {
        $.fn.db.sort($.fn.feedTheDB.sortfunction);
        if ($.fn.db.length > 200) {
            $.fn.db = $.fn.db.slice(0, 200);
        }
    }

})(jQuery);


function hearbeat() {
    if ($().db.length < 1) {
        return false;
    }
    $().sortDB();


    jQuery('body').append('<div class="tweet"></div>');
    var domelem = jQuery('div.tweet:last');
    var elem = $().db[0];
    domelem.append('<img class="tweetimg" src="' + elem.profile_image_url + '">');
    domelem.append('<a class="twitter-anywhere-user" href="http://twitter.com/' + elem.from_user + '">' + elem.from_user + '</a>');
    domelem.append('<span class="timefield t:' + (new Date(elem.created_at)).getTime() + '"></span>');
    domelem.append('<div class="ttext">' + elem.text.linkify().tagify() + '</div>');
    domelem.updateTimeField();
    elem.played++;

    domelem.css('top', '-200px');
    domelem.css('left', $().getViewport().width - 400);
    domelem.find('a.hashtag, a.twittername,a.twitter-anywhere-user').css('color', $().colorpseudo);
    domelem.find('a.somelink').css('color', $().colorlink);
    domelem.css('border-color', $().colorborder);
    domelem.animate({
        left: $().getViewport().width - 680,
        top: $().getViewport().height / 2
    },
    {
        duration: $().hearbeatTime * 0.25,
        step: function(now, fx) {
            var where_we_are = fx.now / fx.end;
            if (!isNaN(where_we_are)) {
                var deg = where_we_are * $().angle;
                $this = $(this);
                $this.css("-moz-transform", 'rotate(' + deg + 'deg)');
                $this.css("-webkit-transform", 'rotate(' + deg + 'deg)');
                $this.css("transform", 'rotate(' + deg + 'deg)');
            }
        },
        complete: function() {
            $this.animate({
                top: '+=40'
            },
            {
                specialEasing: {
                    top: 'easeOutQuad'
                },
                duration: $().hearbeatTime * 0.75
            });
        },
        specialEasing: {
            top: 'easeOutQuad'
        }
    }
    );
    window.setTimeout(followupannimation.bind(domelem), $().hearbeatTime);
}

function followupannimation2() {
    if (parseFloat(this.css('top')) < -200) {
        this.remove();
    } else {
        this.animate({
            left: 10,
            top: parseFloat(this.css('top')) - 100
        },
        $().hearbeatTime * 0.25);
        window.setTimeout(followupannimation2.bind(this), $().hearbeatTime);
    }
}
function followupannimation() {
    $this = $(this);

    $this.animate({
        left: 10,
        borderBottomColor: '#ffffff',
        borderTopColor: '#ffffff',
        borderRightColor: '#ffffff',
        borderLeftColor: '#ffffff',
        backgroundColor: '#eeeeee',
        top: $().getViewport().height - 120
    },
    {
        duration: $().hearbeatTime * 0.25,
        step: function(now, fx) {
            var where_we_are = Math.abs(fx.now / (fx.end - fx.start));
            if (!isNaN(where_we_are)) {

                if (fx.prop == 'left') {

                    //   $().log(fx);
                    var deg = where_we_are * $().angle;
                    $this = $(this);
                    $this.css("-moz-transform", 'rotate(' + deg + 'deg)');
                    $this.css("-webkit-transform", 'rotate(' + deg + 'deg)');
                    $this.css("transform", 'rotate(' + deg + 'deg)');
                }
            }
        },
        specialEasing: {
            top: 'easeInQuad'
        }
    });
    window.setTimeout(followupannimation2.bind($this), $().hearbeatTime);
}

function areWeUp() {
    $.ajax({
        url: 'howweare.status',
        success: function(result) {
            if (result == "1") {
                hearbeat();
                $('#soon').animate({
                    opacity: 0
                },
                {
                    duration: 1000,
                    complete: function() {
                        $(this).remove()
                    }
                });
                var elemens = $('.reveal');
                elemens.css('display', 'block');
                elemens.animate({
                    opacity: 1
                },
                {
                    duration: 1000
                });

            } else {
                window.setTimeout(areWeUp, 2000);

            }
        }
    });
}

$(function() {


    $().feedTheDB();

    //    testpouris();
    window.setInterval($().feedTheDB, 100000);
    hearbeat();
    window.setInterval(hearbeat, $().hearbeatTime);
    $('#hashtag').text($().hashtag);
    $('#logo img').attr('src', $().img);

});


