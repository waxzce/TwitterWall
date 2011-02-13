// my script now
 (function($) {
    $.fn.db = new Array();
    $.fn.hearbeatTime = 3000;
    $.fn.angle = 9;

    $.fn.log = function(msg) {
        if (console) {
            console.log(msg);
        }
    };
    $.fn.feedTheDB = function()
    {
        $.ajax({
            url: ($.fn.feedTheDB.lastcall.refresh_url ? "https://search.twitter.com/search.json" + $().feedTheDB.lastcall.refresh_url: "https://search.twitter.com/search.json?rpp=50&q=%23nantes"),
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
        if ($.fn.db.length > 100) {
            $.fn.db = $.fn.db.slice(0, 100);
        }
    }

})(jQuery);


$(function() {


    $().feedTheDB();

    //    testpouris();
    window.setInterval($().feedTheDB, 120000);
    window.setInterval(hearbeat, $().hearbeatTime);
});


function hearbeat() {
    if ($().db.length < 1) {
        return false;
    }
    $().sortDB();


    jQuery('body').append('<div class="rounded tweet"></div>');
    var domelem = jQuery('div.tweet:last');
    var elem = $().db[0];
    domelem.append('<img class="tweetimg" src="' + elem.profile_image_url + '">');
    domelem.append('<a class="twitter-anywhere-user" href="http://twitter.com/' + elem.from_user + '">' + elem.from_user + '</a>');
    domelem.append('<span class="timefield t:' + (new Date(elem.created_at)).getTime() + '"></span>');
    domelem.append('<div class="ttext">' + elem.text.linkify().tagify() + '</div>');
    domelem.updateTimeField();
    elem.played++;

    domelem.css('top', '-200px');
    domelem.css('left', '500px');
    domelem.animate({
        left: $().getViewport().with / 2,
        top: $().getViewport().height / 2,
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
            left: 20,
            top: parseFloat(this.css('top')) - 100
        },
        $().hearbeatTime * 0.25);
        window.setTimeout(followupannimation2.bind(this), $().hearbeatTime);
    }
}
function followupannimation() {
    $this = $(this);

    $this.animate({
        left: 20,
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


