// my script now
(function($) {
    $.fn.fdb = new Array();  // 
    $.fn.hearbeatTime = 5000;
    $.fn.angle = 9;
    $.fn.twrequest = 'rpp=80&q=from%3Aouestnumerique+OR+%23ouestnumeric+OR+%23ouestnumerique';
    $.fn.hashtag = '#nantes';
    $.fn.log = function(msg) {
        if (console) {
            console.log(msg);
        }
    };
    $.fn.feedTheDB = function()
    {
        $.ajax({
            url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search(0%2C100)%20where%20tags%3D%22swna%22%20and%20min_taken_date%3D%2220110201%22&format=json&diagnostics=true",
            dataType: "jsonp",
            success: function(result) {
                for (i in result.query.results.photo) {
                    var r = result.query.results.photo[i];
                    r.played = 0;
                    $().fdb.push(r);
                }
            }
        });
        $().log("another feed");
    };

   

})(jQuery);


function fhearbeat() {
    if ($().fdb.length < 1) {
        return false;
    }

    var elem = $().fdb[0];



    jQuery('#photos').append('<img src="" />');
    var domelem = jQuery('div.tweet:last');
    
    elem.played++;

   
   // window.setTimeout(followupannimation.bind(domelem), $().hearbeatTime);
}
/*
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
                hearbeat();
                window.setInterval(hearbeat, $().hearbeatTime);
            } else {
                window.setTimeout(areWeUp, 2000);

            }
        }
    });
}

$(function() {


    $().feedTheDB();
    areWeUp();

    //    testpouris();
    window.setInterval($().feedTheDB, 120000);
});

*/
