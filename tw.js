(function($) {
    $.fn.db = new Array();
    $.fn.hearbeatTime = 2000;
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
        return (a.played - b.played)
        //causes an array to be sorted numerically and ascending
    };
    $.fn.sortDB = function() {
        $.fn.db.sort($.fn.feedTheDB.sortfunction);
    }

})(jQuery);


$(function() {


    $().feedTheDB();
    (function($) {
        $.fn.paper = Raphael(0, 0, $().getViewport().width, $().getViewport().height);
    })(jQuery);
    //    testpouris();
    window.setInterval($().feedTheDB, 120000);
    window.setInterval(hearbeat, $().hearbeatTime);
});


function hearbeat() {
    if ($().db.length < 1) {
        return false;
    }
    $().sortDB();

    var mytw = $().db[0];
    mytw.t = $().paper.text(300, 300, mytw.text);
    mytw.t.attr('text-anchor', 'start');
    mytw.played++;

    mytw.t.animate({
        y: mytw.t.attr('y') - 50
    },
    300
    );
    window.setTimeout(oneAnimation.bind(mytw.t), $().hearbeatTime);

}
function oneAnimation() {
    if (this.attr('y') < 50) {
        this.remove();
    } else {
        var nowy = this.attr('y');
        this.animate({
            y: nowy - 50,
            rotation: ((nowy / $().paper.height) * 20) - 20
        },
        300);
        window.setTimeout(oneAnimation.bind(this), $().hearbeatTime);
    }
}



function testpouris() {
    var c = $().paper.circle(50, 50, 40);
    var t = $().paper.text(200, 200, "Raphaël\nkicks\nbutt!");
    t.rotate(45);
    c.animate({
        cx: 20,
        r: 20
    },
    2000);
    t.animateWith(c, {
        x: 20
    },
    2000);

    var p = $().paper.path("M200,200c0,100 200-100 200,0c0,100 -200-100 -200,0z").attr({
        stroke: "#ddd"
    }),
    e = $().paper.ellipse(104, 100, 4, 4).attr({
        stroke: "none",
        fill: "#f00"
    }),
    b = $().paper.rect(0, 0, 620, 400).attr({
        stroke: "none",
        fill: "#000",
        opacity: 0
    }).click(function() {
        e.attr({
            rx: 5,
            ry: 3
        }).animateAlong(p, 4000, true,
        function() {
            e.attr({
                rx: 4,
                ry: 4
            });
        });
    });
}
