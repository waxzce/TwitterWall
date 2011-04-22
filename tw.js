/*
Copyright (C) 2011  Quentin ADAM - @waxzce

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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

if($.query.get('twrequest') != ''){
	
	$('#setupform').remove();
	$('#pub').remove();
	$().feedTheDB();

    //    testpouris();
    window.setInterval($().feedTheDB, 100000);
    hearbeat();
    window.setInterval(hearbeat, $().hearbeatTime);
    $('#hashtag').text($().hashtag);
    $('#logo img').attr('src', $().img);
}else{
	$('#logo img').remove();
	$('input.colorpick').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).val(hex);
			$(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		}
	})
	.bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});
}

   

});


