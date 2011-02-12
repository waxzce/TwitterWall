/*
// jquery plugin under the WTF licence
// created by @waxzce after reading this article : http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
// have fun
*/
(function($) {
    $.fn.getViewport = function(){
        var viewportwidth;
        var viewportheight;
        if (typeof window.innerWidth != 'undefined')
        {
            viewportwidth = window.innerWidth,
            viewportheight = window.innerHeight
        }
        else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
        {
            viewportwidth = document.documentElement.clientWidth,
            viewportheight = document.documentElement.clientHeight
        }
        else
        {
            viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
            viewportheight = document.getElementsByTagName('body')[0].clientHeight
        }
        return {
            width: viewportwidth,
            height: viewportheight
        };
    };

})(jQuery);