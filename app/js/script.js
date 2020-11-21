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
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: true,
            centerMode: true,
            focusOnSelect: true
        });
    })

});



