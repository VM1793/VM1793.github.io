$(document).ready(function(){
    $('[data-modal=callback]').on('click', function() {
        $('.overlay, #callback').fadeIn();
    });
    $('[data-modal=consultation').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal_close').on ('click', function() {
        $('.overlay, #callback, #consultation, #thanks').fadeOut();
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                text: "required",
                email: {
                    required: true,
                    email: true
                }
            },
    
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                text: "Пожалуйста, введите ваше сообщение",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильный формат почты"
                }
            }
        });
    }

    valideForms('#callback-form');
    valideForms('#consultation form');
    valideForms('#callback form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Sending forms
    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #callback').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll
    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

});