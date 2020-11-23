$(document).ready(function () {
    $('#mounth').each(function () {
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function () {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
//validation select
    $(function () {
        if (Number($('.select-options li').attr('rel')) === 0) {
            $("#formInf .submit").attr("disabled", true);
        }
        $(".select-options li").click(function () {
            let SelValue = Number($(this).attr('rel'));
            if (SelValue === 0) {
                $("#formInf .submit").attr("disabled", true);
            } else {
                $("#formInf .submit").attr("disabled", false);
            }
        })
    })
    //modal galery
    $(function () {
        $('.image-link').magnificPopup({
            type: 'image'
        });
    })

    $(function () {
        //slider about us
        $('.single-item-rtl').slick({
            slidesToShow: 1
        });
        $("button.slick-prev, button.slick-next").wrap("<div class='wrapp-btn'></div>");
        //slider prices
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            variableWidth: true,
            focusOnSelect: true
        });
    })
    //hover effect price mouseout
    $(function () {
        $('.car-prices').mouseover(function (e) {
            if (e.target.className === 'btn-buy') {
                $(this).addClass('active')
            }else {
                $(this).removeClass('active')
            }
        })
    })
    //fix header
    $(function() {
        menu_top = $('.wrapp-bg').offset().top;
        const headHeight = $('.wrapp-bg').height()
        $(window).scroll(function () {
            if ($(window).scrollTop() > menu_top) {
                if ($('.wrapp-bg').css('position') != 'fixed') {
                    $('.heder2').width(100 + '%');
                    $('.heder2').height(headHeight);
                    $('.wrapp-bg').css('position','fixed');
                    $('.wrapp-bg').css('top','0');
                }
            } else {
                if ($('.wrapp-bg').css('position') == 'fixed') {
                    $('.wrapp-bg').css('position','');
                    $('.wrapp-bg').css('top','');
                }
            }
        });
    });
    //scroll
    $(function() {
        $("#menu").on("click","a", function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({scrollTop: top - 100 }, 1500);
        });
    });
    //menu activ
    $(window).scroll(function(){
        var $sections = $('.anchor');
        $sections.each(function(i,el){
            var top  = $(el).offset().top - 200;
            var bottom = top +$(el).height();
            var scroll = $(window).scrollTop();
            var id = $(el).attr('id');
            if( scroll > top && scroll < bottom){
                $('#menu a.active').removeClass('active');
                $('#menu a[href="#'+id+'"]').addClass('active');
            }if( scroll < top && scroll > bottom){
                $('#menu a.active').removeClass('active')
            }
        })
    });


});



