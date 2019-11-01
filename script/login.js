(function ($) {

    // Ripple-effect animation
    $(".ripple-effect").click(function (e) {
        var rippler = $(this);

        rippler.append("<span class='ink'></span>");

        var ink = rippler.find(".ink:last-child");
        // prevent quick double clicks
        ink.removeClass("animate");

        // set .ink diametr
        if (!ink.height() && !ink.width()) {
            var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
            ink.css({
                height: d,
                width: d
            });
        }

        // get click coordinates
        var x = e.pageX - rippler.offset().left - ink.width() / 2;
        var y = e.pageY - rippler.offset().top - ink.height() / 2;

        // set .ink position and add class .animate
        ink.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass("animate");

        // remove ink after 1second from parent container
        setTimeout(function () {
            ink.remove();
        }, 1000)
    })



    // Ripple-effect-All animation
    function fullRipper(color, time) {
        setTimeout(function () {
            var rippler = $(".ripple-effect-All");
            if (rippler.find(".ink-All").length == 0) {
                rippler.append("<span class='ink-All'></span>");


                var ink = rippler.find(".ink-All");
                // prevent quick double clicks
                //ink.removeClass("animate");

                // set .ink diametr
                if (!ink.height() && !ink.width()) {
                    var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
                    ink.css({
                        height: d,
                        width: d
                    });
                }

                // get click coordinates
                var x = 0;
                var y = rippler.offset().top - ink.height() / 1.5;

                // set .ink position and add class .animate
                ink.css({
                    top: y + 'px',
                    left: x + 'px',
                    background: color
                }).addClass("animate");

                rippler.css('z-index', 2);

                setTimeout(function () {
                    ink.css({
                        '-webkit-transform': 'scale(2.5)',
                        '-moz-transform': 'scale(2.5)',
                        '-ms-transform': 'scale(2.5)',
                        '-o-transform': 'scale(2.5)',
                        'transform': 'scale(2.5)'
                    })
                    rippler.css('z-index', 0);
                }, 1500);
            }
        }, time)

    }

    // Form control border-bottom line
    $('.blmd-line .form-control').bind('focus', function () {
        $(this).parent('.blmd-line').addClass('blmd-toggled').removeClass("hf");
    }).bind('blur', function () {
        var val = $(this).val();
        if (val) {
            $(this).parent('.blmd-line').addClass("hf");
        } else {
            $(this).parent('.blmd-line').removeClass('blmd-toggled');
        }
    })

    // Change forms
    $(".blmd-switch-button").click(function () {
        var _this = $(this);
        if (_this.hasClass('active')) {
            setTimeout(function () {
                _this.removeClass('active');
                $(".ripple-effect-All").find(".ink-All").remove();
                $(".ripple-effect-All").css('z-index', 0);
            }, 1300);
            $(".ripple-effect-All").find(".ink-All").css({
                '-webkit-transform': 'scale(0)',
                '-moz-transform': 'scale(0)',
                '-ms-transform': 'scale(0)',
                '-o-transform': 'scale(0)',
                'transform': 'scale(0)',
                'transition': 'all 1.5s'
            })
            $(".ripple-effect-All").css('z-index', 2);
            $('#Register-form').addClass('form-hidden')
                .removeClass('animate');
            $('#login-form').removeClass('form-hidden');
        } else {
            fullRipper("#26a69a", 750);
            _this.addClass('active');
            setTimeout(function () {
                $('#Register-form').removeClass('form-hidden')
                    .addClass('animate');
                $('#login-form').addClass('form-hidden');
            }, 2000)

        }
    })
})(jQuery);


// 

$( "#header-plugin" ).load( "https://vivinantony.github.io/header-plugin/", function() {
	$("a.back-to-link").attr("href", "http://blog.thelittletechie.com/2015/03/love-heart-animation-using-css3.html#tlt")  
});

var love = setInterval(function() {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;

    $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'></div>");

    $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);-webkit-animation:love " + (r_time + 5) + "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " + (r_time + 5) + "s ease'></div>");

    $('.heart').each(function() {
        var top = $(this).css("top").replace(/[^-\d\.]/g, '');
        var width = $(this).css("width").replace(/[^-\d\.]/g, '');
        if (top <= -100 || width >= 150) {
            $(this).detach();
        }
    });
}, 500);



const love_btns = document.querySelectorAll('.love');

love_btns.forEach(love_btn => {
	love_btn.addEventListener('mousedown', (e) => {
		love_btn.style.background = '#fff';
		love_btn.style.color = '#E7273F';
		

		createHearts(love_btn.querySelector('.icon-container'));
	});

	love_btn.addEventListener('mouseup', (e) => {
		love_btn.style.background = '#E7273F';
		love_btn.style.color = '#fff';
		
	});
})

function createHearts(container) {
	// create 5 hearts
	for(let i=0; i<15; i++) {
		setTimeout(() => {
			const heart = document.createElement('span');
			heart.classList.add('heart');
			heart.innerHTML = '<i class="fas fa-heart"></i>';
			heart.style.left = Math.random() * 100 + '%';
			heart.style.top = Math.random() * 100 + '%';
			heart.style.fontSize = Math.random() * 20 + 5 + 'px';
			heart.style.animationDuration = Math.random() * 2 + 3 + 's';
			container.appendChild(heart);

			setTimeout(() => {
				heart.remove();
			}, 3000);
		}, i * 100)
	}
}

// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});