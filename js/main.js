var sourceSwap = function() {
    var $this = $(this);
    var newSource = $this.data('alt-src');
    $this.data('alt-src', $this.attr('src'));
    $this.attr('src', newSource);
};

PageInits = {
    wowjs: function() {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
            scrollContainer: null, // optional scroll container selector, otherwise use window,
            resetAnimation: true, // reset animation on end (default is true)
        });

        wow.init();
    },


    imageSwap: function() {
        $('.approach-item').hover(function() {
            $('img', this).attr('src', sourceSwap)
        }, function() {
            $('img', this).attr('src', sourceSwap)
        });
    },



    indexLoader: function() {
        if ($("#index-loader").length > 0) {
            var $this = $(".index-logo");
            $this.after("<span class='loading-circle'></span>");

            var indexLoaderLine = anime({
                targets: '.loading-circle',
                translateX: [
                    { value: ["-50", "-50%"], delay: 5850, duration: 650 },
                ],
                translateY: [
                    { value: ["-50%", "-50%"], delay: 5850, duration: 650 },
                ],
                scaleX: [
                    { value: [0, .025], delay: 200, duration: 500 },
                    { value: [.025, 1.5], delay: 1000, duration: 650 },
                    { value: [1.5, 0], delay: 3450, duration: 650 },
                ],
                scaleY: [
                    { value: [0, .025], delay: 200, duration: 500 },
                    { value: [.025, 1.5], delay: 1000, duration: 650 },
                    { value: [1.5, 0], delay: 3450, duration: 650 },
                ],
                left: [
                    { value: ["50%", "5%"], delay: 5750, duration: 500 },
                ],
                top: [
                    { value: ["90%", "10%"], delay: 5750, duration: 500 },
                ],
                easing: 'easeInOutCubic',
                elasticity: 500,
            });

            var indexLoaderLogo = anime({
                targets: '.index-logo',
                top: [
                    { value: ["30%", "45%"], delay: 200, duration: 600 },
                    { value: ["45%", "90%"], delay: 600, duration: 500 }
                ],
                scale: [
                    { value: [0, 1.5], delay: 200, duration: 600 },
                    { value: [1.5, 0], delay: 600, duration: 500 },
                ],
                opacity: 1,
                easing: "easeInOutQuart",
                elasticity: 500,
            });

            $("#index-loader").delay(6300).fadeOut(400, function() {
                indexLoaderLine.pause();
                indexLoaderLogo.pause();
            });
        }
    },

    homepage: function() {
        if ($('.js-homepage')) {

            if ($(window).width() > 1005) {
                var hpDesktopSlider = $('.portfolio-item a').hover(function() {
                    var $this = $(this).closest('.portfolio-item').toggleClass('active');
                    var $panel = $(this).closest('.portfolio-item').find('.portfolio-item-img').toggleClass('show');

                    if ($('.portfolio-item').hasClass('active')) {
                        $('.portfolio-wrapper').addClass('selected');
                        $('.portfolio').addClass('entered');
                    } else {
                        $('.portfolio-wrapper').removeClass('selected');
                        $('.portfolio').removeClass('entered');
                    }
                });
            }
            $('.portfolio-item a').hover(
                function() {
                    var hpLink = $(this).attr('href');
                    $('.hp-footer h6[data-projectname = ' + hpLink + ']').addClass('hovered');
                    $('.hp-footer h6[data-projectname != ' + hpLink + ']').removeClass('hovered');
                },
                function() {
                    $(".hp-footer h6").removeClass("hovered");
                }
            );


            if ($(window).width() < 1006) {
                var getElementsInArea = (function(docElm) {
                    var viewportHeight = docElm.clientHeight;

                    return function(e, opts) {
                        var found = [],
                            i;

                        if (e && e.type == 'resize')
                            viewportHeight = docElm.clientHeight;

                        for (i = opts.elements.length; i--;) {
                            var elm = opts.elements[i],
                                pos = elm.getBoundingClientRect(),
                                topPerc = pos.top / viewportHeight * 100,
                                bottomPerc = pos.bottom / viewportHeight * 100,
                                middle = (topPerc + bottomPerc) / 2,
                                inViewport = middle > opts.zone[1] &&
                                middle < (100 - opts.zone[1]);

                            elm.classList.toggle(opts.markedClass, inViewport);

                            if (inViewport)
                                found.push(elm);
                        }
                    };
                })(document.documentElement);


                window.addEventListener('scroll', work)
                window.addEventListener('resize', work)

                function work(e) {
                    getElementsInArea(e, {
                        elements: document.querySelectorAll('.portfolio-item'),
                        markedClass: 'in-middle',
                        zone: [20, 20] // percentage distance from top & bottom
                    });
                }
            }
            if ($(window).width() > 1005) {
                // lettering
                $('.index-copy .letter-row-1, .index-copy .letter-row-2').each(function() {
                    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
                });
                var splashScreen = anime.timeline({ loop: false });

                splashScreen
                    .add({
                        targets: '.index-copy .letter',
                        scale: [0, 1],
                        duration: 600,
                        opacity: 1,
                        elasticity: 200,
                        delay: function(el, i) {
                            return 2200 + (i * 15)
                        }
                    }).add({
                        targets: '.index-copy .letter',
                        scale: [1, .25],
                        opacity: 0,
                        rotateZ: 0,
                        duration: 1000,
                        elasticity: 0,
                        delay: function(el, i) {
                            return 1500 + (i * 11)
                        }
                    });
            }
            if ($(window).width() < 1005) {
                // lettering

                var splashScreen = anime.timeline({ loop: false });

                splashScreen
                    .add({
                        targets: '.index-copy',
                        duration: 800,
                        scaleX: [.8, 1],
                        opacity: [0, 1],
                        translateX: ["-50%", "-50%"],
                        translateY: ["50%", "-50%"],
                        rotateZ: [3, 0],
                        elasticity: 200,
                        delay: 2000,
                    }).add({
                        targets: '.index-copy ',
                        scaleX: [1, .8],
                        opacity: 0,
                        rotateZ: [0, 0],
                        translateX: ["-50%", "-50%"],
                        translateY: ["-50%", "-150%"],
                        duration: 1300,
                        elasticity: 0,
                        delay: 2900,
                    });
            }
        }
    },

}

PageInits.wowjs(); // init wow
PageInits.indexLoader();
PageInits.imageSwap(); // swap imafges on hover - approach section





// smoothstate
$(function() {
    'use strict';

    PageInits.homepage();

    var $page = $('#main'),
        options = {

            prefetch: true,
            cacheLength: 2,





        },

        smoothState = $page.smoothState(options).data('smoothState');
});