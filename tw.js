/**
 * ==timeField jQuery plugin==
 * timeField is a simple jQuery plugin to provide Facebook-like auto updating time fields
 * so if you leave the webpage open then after ten minutes you don't see messegas like
 * "posted 8 seconds ago" but "posted 10 minutes ago" as it should be.
 *
 * (c) 2010 Andris Reinman, www.andrisreinman.com
 *
 *  timeField is freely distributable under the terms of a MIT license.
 * 
**/

/**
 * Usage:
 * 
 * HTML:
 * <span class="timefield t:JS_TIMESTAMP"></span>
 * 
 * JS:
 * $(document).ready(function () {
 *	$.timeField.init();
 * });
 */

 (function($) {
    $.timeField = {
        version: "0.1.2",
        interval: 30,
        // seconds
        lang: {
            'years': ['year', 'years'],
            'weeks': ['week', 'weeks'],
            'days': ['day', 'days'],
            'hours': ['hour', 'hours'],
            'minutes': ['minute', 'minutes'],
            'seconds': ['second', 'seconds'],
            'pattern': '%s ago'
        },
        timer: null,
        shift: 0,
        calcTimeDiff: function(timestamp) {
            var diff = new Date().getTime() - timestamp - this.shift,
            years,
            weeks,
            days,
            hours,
            minutes,
            seconds,
            result = [];

            // future dates show as current
            if (diff < 0) diff = 0;

            // find years
            years = Math.floor(diff / (1000 * 3600 * 24 * 365));
            if (years) result.push(years + ' ' + (years == 1 ? this.lang.years[0] : this.lang.years[1]));
            diff -= years * 1000 * 3600 * 24 * 365;

            // find weeks
            weeks = Math.floor(diff / (1000 * 3600 * 24 * 7));
            if (weeks && !result.length) result.push(weeks + ' ' + (weeks == 1 ? this.lang.weeks[0] : this.lang.weeks[1]));
            diff -= weeks * 1000 * 3600 * 24 * 7;

            // find days
            days = Math.floor(diff / (1000 * 3600 * 24));
            if (days && !result.length) result.push(days + ' ' + (days == 1 ? this.lang.days[0] : this.lang.days[1]));
            diff -= weeks * 1000 * 3600 * 24;

            // find hours
            hours = Math.floor(diff / (1000 * 3600));
            if (hours && !result.length) result.push(hours + ' ' + (hours == 1 ? this.lang.hours[0] : this.lang.hours[1]));
            diff -= weeks * 1000 * 3600;

            // find minutes
            minutes = Math.floor(diff / (1000 * 60));
            if (minutes && !result.length) result.push(minutes + ' ' + (minutes == 1 ? this.lang.minutes[0] : this.lang.minutes[1]));
            diff -= weeks * 1000 * 60;

            // find seconds
            seconds = Math.floor(diff / (1000));
            if (!result.length) result.push(seconds + ' ' + (seconds == 1 ? this.lang.seconds[0] : this.lang.seconds[1]));

            // return time as string
            return this.lang.pattern.replace('%s', result.join(" "));
        },
        create: function(timestamp) {
            timestamp = timestamp || new Date().getTime() - this.shift;
            var timefield = document.createElement('span')
            timefield.className = "timefield t:" + timestamp;
            timefield.innerHTML = this.calcTimeDiff(timestamp);
            return $(timefield).updateTimeField();
        },
        init: function(options) {
            options = typeof options == 'object' && options || {};

            // Set language strings
            this.lang = options.lang || this.lang;

            // Set interval
            this.interval = options.interval || this.interval;

            // Sync times with server
            if (options.current)
            this.shift = new Date().getTime() - options.current;

            window.clearInterval(this.timer);
            $(".timefield").updateTimeField();
            this.timer = window.setInterval(function() {
                $(".timefield").updateTimeField();
            },
            1000 * this.interval);
        }
    }
    $.fn.extend({
        // Add .updateTimeField method to jQuery elements
        // method checks if the element is valid (has required class names)
        // and replaces its text contents
        updateTimeField: function() {
            return this.each(function() {
                var element = jQuery(this);
                if (!element[0].className.match(/timefield/))
                return element;
                var timestamp = element[0].className.match(/t:([0-9]+)/)[1];
                if (!timestamp)
                return element;
                element.text($.timeField.calcTimeDiff(timestamp));
                return element;
            });
        }
    });
})(jQuery);

String.prototype.linkify = function() {
    return this.replace(/(https?:\/\/\S+)/gi,
    function(m) {
        return '<a target="_blank" href="' + m + '">' + m + "</a>";
    });
};
String.prototype.tagify = function() {
    return this.replace(/(^|\s)#(\w+)/g,
    function(m) {
        return '<a target="_blank" href="http://search.twitter.com/search?q=' + m.replace('#', '%23') + '">' + m + "</a>";
    });
};

jQuery.timeField.init({
    lang: {
        'years': ['année', 'années'],
        'weeks': ['semaine', 'semaines'],
        'days': ['jour', 'jours'],
        'hours': ['heure', 'heures'],
        'minutes': ['minute', 'minutes'],
        'seconds': ['seconde', 'secondes'],
        'pattern': 'il y a %s'
    },
    interval: 2
}
);

// my script now
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
        var playcom = (a.played - b.played);
		if(playcom == 0){
			var playcom = (new Date(b.created_at)).getTime() - (new Date(a.created_at)).getTime();
		}
        return playcom;
        //causes an array to be sorted numerically and ascending
    };
    $.fn.sortDB = function() {
        $.fn.db.sort($.fn.feedTheDB.sortfunction);
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
    elem.played++;

    //  window.setTimeout(oneAnimation.bind(mytw.t), $().hearbeatTime);
}




