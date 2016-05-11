/* Add here all your JS customizations */
jQuery(document).ready(function($) {
    $(".slide_Lbox a").click(function() {
        $.fancybox({
            'padding': 0,
            'aspectRatio': true,
            'width': "1280",
            'height': "720",
            'autoWidth': true,
            'autoHeight': true,
            'autoCenter': true,
            'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'embed/'),
            'wrapCSS': 'Lbox_video',
            'type': 'iframe',
            'swf': {
                'preload': false

            },
            'afterLoad': function() {
                $(".tp-playToggle .fa").trigger("click");
            },
            'afterClose': function() {
                $(".tp-playToggle .fa").trigger("click");
            },
        });

        return false;
    });
    $("a.fancybox").fancybox();
    $('.b-search-box .fa').click(function() {
        var target = '.b-search-box #searchField';
        $(target).toggle();
        if ($(target).is(':visible')) {
            $(this).addClass('fa-times');
            $(target).focus();
        } else {
            $(this).removeClass('fa-times');
        }
    });

    $("#video1-volOff").bind("click", function() {
        $("#video1-volUp").show();
        $("#video1").load(); 
        $("#video1").prop('muted', false);
        $(this).hide();
    });
    $("#video1-reload").bind("click", function(e) {
        e.preventDefault();
        $("#video1").load();
        $("#video1").parent().fadeIn(500);
         $("#video1-volOff").show();
        $("#video1-volOn").hide();
        $(".tp-playToggle .fa-pause").click();
    });
    $("#video1-volUp").bind("click", function() {
        $("#video1-volOff").show();
        $("#video1").prop('muted', true)
        $(this).hide();
    });

    $("#video1").on("playing", function() {
        $(".tp-playToggle .fa").show();
        $(".video-volume-controls").show();
    });

    $("#video1").on("ended", function() {
        $(this).parent().fadeOut(500);
        $(".video-volume-controls").hide();
        $(".tp-playToggle .fa").show();
        $(".tp-playToggle .fa").click();
    });

    /* $( "#requestForm" ).load( "RequestForm.html",function( response, status ) {
        if ( status) {
            $('#requestForm').removeClass('hidden');
    }else{
        var msg = "Sorry! error loading Request Form. Try reload page";
            alert(msg);
    }
    });  */

    $(window).load(function() {
        var imgLoad = ImgBlur();
        if (imgLoad) {
            imgLoad.slideDown(500);
        }
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() + $("#scrollObj").height() < $("#scrollObj").offset().top - 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    $(".scrollToTop").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#scrollObj").offset().top
        }, 2000);

    });
    /* $(".myLeoLink").hover(function() {  
         var getSrc= $('.myLeoLink').find('img').attr('src');
         var getOSrc= $('.myLeoLink').find('img').attr('data-src');
        $(this).find('img').attr('src', getOSrc);
        $(this).find('img').attr('data-src', getSrc);
    }, function() {
        var getSrc= $('.myLeoLink').find('img').attr('src');
         var getOSrc= $('.myLeoLink').find('img').attr('data-src');
         $(this).find('img').attr('src', getOSrc);
        $(this).find('img').attr('data-src', getSrc);
    }); */
    $(".myLeoLink").hover(function() {
        $(this).find('img').attr('src', 'img/myLEO-over.svg');
    }, function() {
        $(this).find('img').attr('src', 'img/myLEO.svg');
    });
    $(".widget_nav_title").on('click', function(e) {
        if ($(window).width() < BREAK.MD) {
            e.preventDefault();
            $(".widget_nav_menu .menu_container").slideToggle();
        }
    });

    $('.bx-slides').bxSlider({
        maxSlides: 1,
        controls: false,
        pager: true,
        resposive: false,
    });


});


function reloadScript(event) {
    if (event.persisted) {
        window.location.reload();
    }

}

function ImgBlur() {
    var bgHead = jQuery('.b-header-image__container');
    var bgHeadImgCntr = jQuery('#b-pageHeader-img__bg');
    var bgHeadImg = jQuery('#interiorContentHeader img');
    var bgHeadImgSrc = bgHeadImg.prop('src');
    if (bgHeadImg != true && bgHeadImgSrc != null) {
        //var bgHeadImgSrc = bgHeadImg.prop('src');
        bgHeadImgCntr.css({
            'background-image': 'url(' + bgHeadImgSrc + ')',
        });
        return bgHead;
    } else {
        return false;
    }
}
