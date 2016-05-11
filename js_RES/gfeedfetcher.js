(function($) {
    $.fn.FeedRSS = function(opt) {
        var def = $.extend({
            MaxCount: 5,
            ShowDesc: true,
            ShowPubDate: true,
            DescCharacterLimit: 0,
            TitleLinkTarget: "_blank",
            DateFormat: "",
            DateFormatLang: "en"
        }, opt);
        var gfeedfetcher_loading_image = "js_RES/bxslider/images/bx_loader.gif"
        var id = $(this).attr("id"),
            i, s = "",
            dt;
        $("#" + id).empty();
        if (def.FeedUrl == undefined) return;
        $("#" + id).append('<div align="center"><img src="' + gfeedfetcher_loading_image + '" align="center"/></div>');
        var YQLstr = 'SELECT channel.item FROM feednormalizer WHERE output="rss_2.0" AND url ="' + def.FeedUrl + '" LIMIT ' + def.MaxCount;

        $.ajax({
            url: "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(YQLstr) + "&format=xml&diagnostics=false&callback=?",
            dataType: "json",
            success: function(data) {
                $("#" + id).empty();
                if (!(data.results instanceof Array)) {
                    data.results = [data.results];
                }
                $.each(data.results, function(e, itm) {
                    var itm = $.parseHTML(itm);
                    var itemlink = itm[0].getElementsByTagName("link")[0].nextSibling.nodeValue;
                    var itemtitle = itm[0].getElementsByTagName("title")[0].innerHTML;
                    var itemdate = itm[0].getElementsByTagName("pubdate")[0].innerHTML;
                    var description = itm[0].getElementsByTagName("content:encoded")[0].innerHTML;
                    var description = $.parseHTML(description);
                    var description = $.parseHTML(description[0].nodeValue);
                    var imgTag = description[0];
                    var imgSource = imgTag ? imgTag.getAttribute("src") : "";
                    var itemdescription = description[1].innerHTML;
                    if (itemdescription) {
                        if (def.DescCharacterLimit > 0 && itemdescription.length > def.DescCharacterLimit) {
                            itemdescription = itemdescription.substring(0, def.DescCharacterLimit) + '...';
                        } else {
                            itemdescription = itemdescription;
                        }
                    }
                    if (imgSource) {
                        imgTag = '<img data-retina="" src="' + imgSource + '"  alt="' + itemtitle + '" />';
                    } else {
                        imgTag = '<img data-retina="" src="img/homepage/cityofcommerce.jpg" alt="">';
                        //imgTag ='';
                    }
                    s += '<li>';
                    s += '<div class="b-carousel-primary__item ">';
                    s += '<div class="b-news-item f-news-item">';
                    s += '<a href="' + itemlink + '">'
                    s += '<div class="hidden-xs b-news-item__img view view-sixth"> ' + imgTag
                    s += '<div class="b-item-hover-action f-center mask"><div class="b-item-hover-action__inner">'
                    s += '<div class="b-item-hover-action__inner-btn_group"> <span class="b-btn f-btn b-btn-light f-btn-light info" ><i class="fa fa-link"></i></span> </div>'
                    s += '</div> </div> </div>'
                    s += '<div class="b-news-item__info">'
                    s += '<div class="b-news-item__info_title f-news-item__info_title f-primary-b">' + itemtitle + '</div>'
                    s += '<div class="b-news-item__info_additional"> <span class="f-news-item__info_additional_item b-news-item__info_additional_item"> <i class="fa fa-calendar-o"></i> ' + itemdate + ' </span> </div>'
                    s += '<div class="b-news-item__info_text f-news-item__info_text">' + itemdescription + '</div>'
                        //rssoutput += '<a class="f-news-item__info_more f-more f-secondary-b" href="'+ itemlink +'" >Read more <i class="fa fa-chevron-circle-right"></i></a> </div>'
                    s += '<span class="f-news-item__info_more f-more f-secondary-b" href="' + itemlink + '" >Read more <i class="fa fa-chevron-circle-right"></i></span>'
                    s += '</div>'
                    s += '</a>'
                    s += ' </div></div>'
                });
                $("#" + id).append('<ul class="j-carousel-rss">' + s + '</ul>');

                var gfeedfetcher_loading_image = "js/bxslider/images/bx_loader.gif"


                $('.j-carousel-rss').bxSlider({
                    maxSlides: 2,
                    controls: false,
                    slideMargin: 30,
                    slideWidth: 568,
                    pager: true,
                    infiniteLoop: false,
                    onSliderLoad: function() {
                        // do funky JS stuff here
                        $('.loadingrss').hide();
                        $('.b-carousel-primary__item').show();
                        $("#requestForm").load("RequestForm.html");
                    }
                });

            }
        });
    };
})(jQuery);
