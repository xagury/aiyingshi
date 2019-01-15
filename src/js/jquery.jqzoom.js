

(function ($) {
    $.fn.jqueryzoom = function (options) {
        console.log(1);
        var settings = {
            xzoom: 200, //zoomed width default width
            yzoom: 200, //zoomed div default width
            offset: 10, //zoomed div default offset
            position: "right", //zoomed div default position,offset position is to the right of the image
            lens: 1, //zooming lens over the image,by default is 1;
            preload: 1
        };

        if (options) {
            $.extend(settings, options);
        }
        console.log($(this));
        var noalt = '';
        $(this).hover(function () {
            var imageLeft = this.offsetLeft;
            var imageTop = $(this).get(0).offsetTop;
            var imageWidth = $(this).children('img').get(0).offsetWidth;
            var imageHeight = $(this).children('img').get(0).offsetHeight;



            if ($(".zoomdiv").get().length == 0) {

                var bigimage = $(this).children("img").attr("src");

                $(this).after("<div class='zoomdiv'><img class='bigimg' src='" + bigimage + "'/></div>");


                $(this).append("<div class='jqZoomPup'>&nbsp;</div>");

            }


            if (settings.position == "right") {

                if (imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width) {

                    leftpos = imageLeft - settings.offset - settings.xzoom;

                } else {

                    leftpos = imageLeft + imageWidth + settings.offset;
                }
            } else {
                leftpos = imageLeft - settings.xzoom - settings.offset;
                if (leftpos < 0) {

                    leftpos = imageLeft + imageWidth + settings.offset;

                }

            }

            $(".zoomdiv").css({ top: imageTop, left: leftpos });

            $(".zoomdiv").width(500);

            $(".zoomdiv").height(500);

            $(".zoomdiv").show();

            if (!settings.lens) {
                $(this).css('cursor', 'crosshair');
            }




            $(document.body).mousemove(function (e) {



                mouse = new MouseEvent(e);

                // $("div.jqZoomPup").show();


                var bigwidth = $(".bigimg").get(0).offsetWidth;

                var bigheight = $(".bigimg").get(0).offsetHeight;

                var scaley = 'x';

                var scalex = 'y';


                if (isNaN(scalex) | isNaN(scaley)) {

                    var scalex = (bigwidth / imageWidth);

                    var scaley = (bigheight / imageHeight);

                    var tempWidth = (settings.xzoom) / scalex;
                    var tempHeight = (settings.yzoom) / scaley;
                    tempHeight = tempHeight > 500 ? 313 : tempHeight;
                    tempWidth = tempWidth > 500 ? 313 : tempWidth;

                    $(".jqZoomPup").width(tempWidth);

                    $(".jqZoomPup").height(tempHeight);

                    if (settings.lens) {
                        $(".jqZoomPup").css('visibility', 'visible');
                    }

                }



                xpos = mouse.x - $(".jqZoomPup").width() / 2 - imageLeft;

                ypos = mouse.y - $(".jqZoomPup").height() / 2 - imageTop;

                if (settings.lens) {

                    xpos = (mouse.x - $(".jqZoomPup").width() / 2 < imageLeft) ? 0 : (mouse.x + $("div.jqZoomPup").width() / 2 > imageWidth + imageLeft) ? (imageWidth - $("div.jqZoomPup").width() - 2) : xpos;

                    ypos = (mouse.y - $(".jqZoomPup").height() / 2 < imageTop) ? 0 : (mouse.y + $("div.jqZoomPup").height() / 2 > imageHeight + imageTop) ? (imageHeight - $("div.jqZoomPup").height() - 2) : ypos;

                }
             
                if (settings.lens) {

                    $("div.jqZoomPup").css({ top: ypos, left: xpos });

                }



                scrolly = ypos;

                $(".zoomdiv").get(0).scrollTop = scrolly * scaley;

                scrollx = xpos;

                $(".zoomdiv").get(0).scrollLeft = (scrollx) * scalex;


            });
        }, function () {

            $(this).children("img").attr("alt", noalt);
            $(document.body).unbind("mousemove");
            if (settings.lens) {
                $("div.jqZoomPup").remove();
            }
            $("div.zoomdiv").remove();

        });

        count = 0;

        if (settings.preload) {

            // $('body').append("<div style='display:none;' class='jqPreload"+count+"'></div>");

            $(this).each(function () {

                var imagetopreload = $(this).children("img").attr("jqimg");

                var content = jQuery('div.jqPreload' + count + '').html();

                jQuery('div.jqPreload' + count + '').html(content + '<img src=\"' + imagetopreload + '\">');

            });

        }

    }

})(jQuery);

function MouseEvent(e) {
    this.x = e.pageX
    this.y = e.pageY


}


