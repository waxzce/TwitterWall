// javascript:$.extend({URLEncode:%20function(c)%20{var%20o%20=%20%27%27;var%20x%20=%200;c%20=%20c.toString();var%20r%20=%20/(^[a-zA-Z0-9_.]*)/;while%20(x%20<%20c.length)%20{var%20m%20=%20r.exec(c.substr(x));if%20(m%20!=%20null%20&&%20m.length%20>%201%20&&%20m[1]%20!=%20%27%27)%20{o%20+=%20m[1];x%20+=%20m[1].length;}%20else%20{if%20(c[x]%20==%20%27%20%27)%20o%20+=%20%27+%27;else%20{var%20d%20=%20c.charCodeAt(x);var%20h%20=%20d.toString(16);o%20+=%20%27%%27%20+%20(h.length%20<%202%20?%20%270%27:%20%27%27)%20+%20h.toUpperCase();}x++;}}return%20o;},URLDecode:%20function(s)%20{var%20o%20=%20s;var%20binVal,t;var%20r%20=%20/(%[^%]{2})/;while%20((m%20=%20r.exec(o))%20!=%20null%20&&%20m.length%20>%201%20&&%20m[1]%20!=%20%27%27)%20{b%20=%20parseInt(m[1].substr(1),%2016);t%20=%20String.fromCharCode(b);o%20=%20o.replace(m[1],%20t);}return%20o;}});(function($)%20{$.fn.db%20=%20new%20Array();$.fn.hearbeatTime%20=%205000;$.fn.angle%20=%209;$.fn.twrequest%20=%20%27rpp=80&q=%27%20+%20$.URLEncode($.query.get(%27twrequest%27));$.fn.hashtag%20=%20$.query.get(%27hashtag%27);$.fn.img%20=%20$.query.get(%27img%27);$.fn.colorpseudo%20=%20%27#%27+$.query.get(%27colorpseudo%27);$.fn.colorlink%20=%20%27#%27+$.query.get(%27colorlink%27);$.fn.colorborder%20=%20%27#%27+$.query.get(%27colorborder%27);$.fn.log%20=%20function(msg)%20{if%20(console)%20{console.log(msg);}};$.fn.feedTheDB%20=%20function(){$.ajax({url:%20($.fn.feedTheDB.lastcall.refresh_url%20?%20%22https://search.twitter.com/search.json%22%20+%20$().feedTheDB.lastcall.refresh_url:%20%22https://search.twitter.com/search.json?%22%20+%20$().twrequest),dataType:%20%22jsonp%22,success:%20function(result)%20{for%20(i%20in%20result.results)%20{var%20r%20=%20result.results[i];r.played%20=%200;$().db.push(r);}$.fn.feedTheDB.lastcall%20=%20result;$().log($.fn.feedTheDB.lastcall.refresh_url);$().log(result);}});$().log(%22another%20feed%22);};$.fn.feedTheDB.lastcall%20=%20{};$.fn.feedTheDB.sortfunction%20=%20function(a,%20b)%20{var%20playcom%20=%20(a.played%20-%20b.played);if%20(playcom%20==%200)%20{var%20playcom%20=%20(new%20Date(b.created_at)).getTime()%20-%20(new%20Date(a.created_at)).getTime();}return%20playcom;};$.fn.sortDB%20=%20function()%20{$.fn.db.sort($.fn.feedTheDB.sortfunction);if%20($.fn.db.length%20>%20200)%20{$.fn.db%20=%20$.fn.db.slice(0,%20200);}}})(jQuery);function%20hearbeat()%20{if%20($().db.length%20<%201)%20{return%20false;}$().sortDB();jQuery(%27body%27).append(%27<div%20class=%22tweet%22></div>%27);var%20domelem%20=%20jQuery(%27div.tweet:last%27);var%20elem%20=%20$().db[0];domelem.append(%27<img%20class=%22tweetimg%22%20src=%22%27%20+%20elem.profile_image_url%20+%20%27%22>%27);domelem.append(%27<a%20class=%22twitter-anywhere-user%22%20href=%22http://twitter.com/%27%20+%20elem.from_user%20+%20%27%22>%27%20+%20elem.from_user%20+%20%27</a>%27);domelem.append(%27<span%20class=%22timefield%20t:%27%20+%20(new%20Date(elem.created_at)).getTime()%20+%20%27%22></span>%27);domelem.append(%27<div%20class=%22ttext%22>%27%20+%20elem.text.linkify().tagify()%20+%20%27</div>%27);domelem.updateTimeField();elem.played++;domelem.css(%27top%27,%20%27-200px%27);domelem.css(%27left%27,%20$().getViewport().width%20-%20400);domelem.find(%27a.hashtag,%20a.twittername,a.twitter-anywhere-user%27).css(%27color%27,%20$().colorpseudo);domelem.find(%27a.somelink%27).css(%27color%27,%20$().colorlink);domelem.css(%27border-color%27,%20$().colorborder);domelem.animate({left:%20$().getViewport().width%20-%20680,top:%20$().getViewport().height%20/%202},{duration:%20$().hearbeatTime%20*%200.25,step:%20function(now,%20fx)%20{var%20where_we_are%20=%20fx.now%20/%20fx.end;if%20(!isNaN(where_we_are))%20{var%20deg%20=%20where_we_are%20*%20$().angle;$this%20=%20$(this);$this.css(%22-moz-transform%22,%20%27rotate(%27%20+%20deg%20+%20%27deg)%27);$this.css(%22-webkit-transform%22,%20%27rotate(%27%20+%20deg%20+%20%27deg)%27);$this.css(%22transform%22,%20%27rotate(%27%20+%20deg%20+%20%27deg)%27);}},complete:%20function()%20{$this.animate({top:%20%27+=40%27},{specialEasing:%20{top:%20%27easeOutQuad%27},duration:%20$().hearbeatTime%20*%200.75});},specialEasing:%20{top:%20%27easeOutQuad%27}});window.setTimeout(followupannimation.bind(domelem),%20$().hearbeatTime);}function%20followupannimation2()%20{if%20(parseFloat(this.css(%27top%27))%20<%20-200)%20{this.remove();}%20else%20{this.animate({left:%2010,top:%20parseFloat(this.css(%27top%27))%20-%20100},$().hearbeatTime%20*%200.25);window.setTimeout(followupannimation2.bind(this),%20$().hearbeatTime);}}function%20followupannimation()%20{$this%20=%20$(this);$this.animate({left:%2010,borderBottomColor:%20%27#ffffff%27,borderTopColor:%20%27#ffffff%27,borderRightColor:%20%27#ffffff%27,borderLeftColor:%20%27#ffffff%27,backgroundColor:%20%27#eeeeee%27,top:%20$().getViewport().height%20-%20120},{duration:%20$().hearbeatTime%20*%200.25,step:%20function(now,%20fx)%20{var%20where_we_are%20=%20Math.abs(fx.now%20/%20(fx.end%20-%20fx.start));if%20(!isNaN(where_we_are))%20{if%20(fx.prop%20==%20%27left%27)%20{var%20deg%20=%20where_we_are%20*%20$().angle;$this%20=%20$(this);$this.css(%22-moz-transform%22,%20%27rotate(%27%20+%20deg%20+%20%27deg)%27);$this.css(%22-webkit-transform%22,%20%27rotate(%27%20+%20deg%20+%20%27deg)%27);$this.css(%22transform%22,%20%27rotate(%27%20+%20deg%20+%20%27deg)%27);}}},specialEasing:%20{top:%20%27easeInQuad%27}});window.setTimeout(followupannimation2.bind($this),%20$().hearbeatTime);}function%20areWeUp()%20{$.ajax({url:%20%27howweare.status%27,success:%20function(result)%20{if%20(result%20==%20%221%22)%20{hearbeat();$(%27#soon%27).animate({opacity:%200},{duration:%201000,complete:%20function()%20{$(this).remove()}});var%20elemens%20=%20$(%27.reveal%27);elemens.css(%27display%27,%20%27block%27);elemens.animate({opacity:%201},{duration:%201000});}%20else%20{window.setTimeout(areWeUp,%202000);}}});}$(function()%20{if($.query.get(%27twrequest%27)%20!=%20%27%27){$(%27#setupform%27).remove();$().feedTheDB();window.setInterval($().feedTheDB,%20100000);hearbeat();window.setInterval(hearbeat,%20$().hearbeatTime);$(%27#hashtag%27).text($().hashtag);$(%27#logo%20img%27).attr(%27src%27,%20$().img);}else{$(%27#logo%20img%27).remove();$(%27input.colorpick%27).ColorPicker({onSubmit:%20function(hsb,%20hex,%20rgb,%20el)%20{$(el).val(hex);$(el).ColorPickerHide();},onBeforeShow:%20function%20()%20{$(this).ColorPickerSetColor(this.value);}}).bind(%27keyup%27,%20function(){$(this).ColorPickerSetColor(this.value);});}});
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

if($.query.get('twrequest') != ''){
	
	$('#setupform').remove();
	$().feedTheDB();

    //    testpouris();
    window.setInterval($().feedTheDB, 100000);
    hearbeat();
    window.setInterval(hearbeat, $().hearbeatTime);
    $('#hashtag').text($().hashtag);
    $('#logo img').attr('src', $().img);
}else{
	$('#logo img').remove();
	$('#logo').html('<script type="text/javascript"><!--
	google_ad_client = "ca-pub-8359775803550243";
	/* annonce twitter wall */
	google_ad_slot = "5047534204";
	google_ad_width = 250;
	google_ad_height = 250;
	//-->
	</script>
	<script type="text/javascript"
	src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
	</script>');
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


