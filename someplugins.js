/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return - c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return - c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return - c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return - c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return - c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return - c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b: c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c: c * ( - Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * ( - Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return - c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return - c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return - .5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
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