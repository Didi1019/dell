$(function() {
    toggleUI();
    hidden();
    slider();
    pager();
    gridtolist();
    hoverImg();
    gradientImg();
    marked();
    password();
    rotation();
    calculator();
    tablet();
    mouseLeave();
    intersection();
});


$(document).ready(function () {
    function hoverImg() {
        var fileName = window.location.pathname.split('/').pop();
        if (fileName.startsWith('list')) {        
            $(".change img").hover(
                function() {
                    var img = $(this);
                    img.css('opacity', '0');
                    img.one('transitionend', function() {
                        var originalSrc = img.attr('src');
                        var hoverSrc = originalSrc.replace(".png", "Hover.png");
                        img.attr('src', hoverSrc).css('opacity', '1'); 
                    });
                },
                function() {
                    var img = $(this);
                    img.css('opacity', '0');
                    img.one('transitionend', function() {
                        var hoverSrc = img.attr('src');
                        var originalSrc = hoverSrc.replace("Hover.png", ".png");
                        img.attr('src', originalSrc).css('opacity', '1'); 
                    });
                }
            );
        }
    }

    hoverImg();
});
function password() {
    $('#createPW').submit(function(event) {
        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        if (newPassword !== confirmPassword) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
          confirm_password.setCustomValidity('');
        }
      
    });
}
function intersection() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('show');
                observer.unobserve(entry.target); 
            }
        });
    });
    const hiddenElements = $('.details ul > li, .imageLf > *, .imageRT > *');
    hiddenElements.each(function() {
        observer.observe(this);
    });
}
function marked(){
    $(".detailContainer > div:nth-of-type(3) > aside > ul > li > input:first-of-type").prop('checked', true);
} 
function gradientImg() {
    var secondLi = $(".color-change ul.gradient li:nth-child(2)");
    var thirdLi = $(".color-change ul.gradient li:nth-child(3)");
    function hoverEffect(li, replacementText) {
        li.hover(
            function() {
                var img = $(this).closest('div').find('img');
                img.css('opacity', '0');
                img.one('transitionend', function() {
                    var originalSrc = img.attr('src');
                    var hoverSrc = originalSrc.replace(".png", replacementText + ".png");
                    img.attr('src', hoverSrc).css('opacity', '1');
                });
            }, 
            function() {
                var img = $(this).closest('div').find('img');
                img.css('opacity', '0');
                img.one('transitionend', function() {
                    var hoverSrc = img.attr('src');
                    var originalSrc = hoverSrc.replace(replacementText + ".png", ".png");
                    img.attr('src', originalSrc).css('opacity', '1');
                });
            }
        );
    }
    hoverEffect(secondLi, "Second");
    hoverEffect(thirdLi, "Third");
}
function hidden() {
    $('[class*="Hidden"]').hide();

    $("b.rbBL14").click(function() {
        $(this).next("ol.rbRG14-Hidden").slideToggle("fast");
    });
    $("input.rbMD14-specification").click(function() {
        $(this).prev("ul.rbMD14-Hidden").slideToggle("fast");
    });
    $('.rbBL14, .tech-Toggle, .rbMD14-specification').on('click', function() {
        $(this).toggleClass('active');
    });
    $('div.listContainer > div > aside > h3').on('click', function() {
        const aside = $(this).closest('aside');
        const ul = aside.find('ul');
        const inputButton = aside.find('input.mui.filter');
        
        ul.toggleClass('active');
        inputButton.toggle(ul.hasClass('active'));
    });
    
    $('div.listContainer > div > aside > input').on('click', function() {
        $(this).siblings('ul').removeClass('active');
        $(this).hide();
    });
   
    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $('header').toggleClass('is-active');
        $('header > div nav').toggleClass('is-active'); 
    });
    $('header > div nav ul li b').on('click', function() {
        $(this).toggleClass('active');
        $(this).next('ol').slideToggle("fast");
    });

    $('footer > div > ul:first-of-type > li > strong').on('click', function() {
        $(this).toggleClass('active');
        $(this).next('ol').slideToggle("fast"); 
    });
}
function toggleUI() {
    $('[class*="Toggle"]').click(function() {
        var $this = $(this);
        var targetClass;

        if ($this.hasClass('search-Toggle')) {
            targetClass = 'search-Panel';
        } else if ($this.hasClass('cart-Toggle')) {
            targetClass = 'cart-Panel';
        } else if ($this.hasClass('tech-Toggle')) {
            targetClass = 'tech-Panel';
        }else if ($this.hasClass('specification-Toggle')) {
            targetClass = 'specification-Panel';
        }
        if (targetClass) {
            $('.' + targetClass).toggle();         
            if ($('.' + targetClass).is(':visible')) {
                $(window).on('scroll', function() {
                    var $stickyElement = $('section.detailContainer > div:first-child');
                    var $table = $('section.detailContainer .tech-Panel table');                    
                    var scrollTop = $(window).scrollTop();                    
                    var tableTop = $table.offset().top;
                    var tableBottom = tableTop + $table.height();                    
                    var stickyHeight = $stickyElement.height();                    
                    if (scrollTop >= tableTop && scrollTop <= (tableBottom - stickyHeight)) {
                        $stickyElement.css({
                            'position':'sticky',
                            'top':  '60px'
                        });
                    } else {
                        $stickyElement.css({
                            'position': 'relative',
                            'top': 'auto'
                        });
                    }
                });
            }
        }
    });
    $('.search-Panel').click(function(event) {
        var panelWidth = $(this).outerWidth();
        var clickPosition = event.pageX - $(this).offset().left;
        if (clickPosition >= panelWidth - 29) {
            $(this).toggle();
        }
    });
}

function tablet() {
    function applySettings() {
        if (window.matchMedia("(max-width: 1279px)").matches) {
            $('header > div nav ul li ol, footer > div ul li ol').hide();
            $('header > div nav ul li b, footer > div ul li strong').removeClass('active');
            $('header > div nav ul li b').off('click').on('click', function () {
                $(this).next('ol').slideToggle("fast");
                $(this).toggleClass('active');
            });

            $('footer > div ul li strong').off('click').on('click', function () {
                $(this).next('ol').slideToggle("fast");
                $(this).toggleClass('active');
            });
        } else {
            $('header > div nav ul li b, footer > div ul li strong').off('click').removeClass('active');
            $('header > div nav ul li ol, footer > div ul li ol').show(); 
        }
    }
    applySettings();
    $(window).on('resize', applySettings);
}
function calculator() {
    const productPrice = 1242.99;
    function updateCart(action) {
        let currentItemCount = parseInt($('#itemNumber').text());
        let currentInputCount = parseInt($('#numberInput').val());
        switch (action) {
            case 'add':
                currentItemCount++;
                currentInputCount++;
                break;
            case 'minus':
                currentItemCount = Math.max(currentItemCount - 1, 1); 
                currentInputCount = Math.max(currentInputCount - 1, 1); 
                break;
            case 'remove':
                currentItemCount = 1;  
                currentInputCount = 1; 
                $('.product').slideUp('fast', function () {
                    $(this).remove();
                });
                break;
        }
        
        $('#itemNumber').text(currentItemCount);
        $('#numberInput').val(currentInputCount);
        
        updatePrices(currentItemCount);
    }

    function roundToTwoDecimals(number) {
        return Math.round(number * 100) / 100;
    }

    function updatePrices(itemCount) {
        let subtotal = itemCount * productPrice;
        let tax = subtotal * 0.05;
        let totalPrice = subtotal + tax;
    
        $('.price').text('$' + roundToTwoDecimals(itemCount * productPrice));
     
        $('.subtotal').text(roundToTwoDecimals(subtotal));
        $('.tax').text(roundToTwoDecimals(tax));
        $('.totalprice').text(roundToTwoDecimals(totalPrice));
    }
    $('#addButton, #minusButton, #removeButton').click(function () {
        const action = this.id == 'addButton' ? 'add' 
                      : this.id == 'minusButton' ? 'minus' 
                      : 'remove';
        updateCart(action);
    });

}

function slider() {
    $('.sButton > button').on('click', function() {
        const slider = $('main > div:first-of-type > ul');
        const items = $('main > div:first-of-type > ul li');
        
        if ($(this).hasClass('next')) {
            slider.append(items.first());
        } else if ($(this).hasClass('prev')) {
            slider.prepend(items.last());
        }
    });
    $('main > div:first-of-type > ul li').on('click', function() {
        const slider = $('main > div:first-of-type > ul');
        $(this).insertAfter(slider.children().first()); 
    });
}

function pager() {
    var $pagerLine = $("<li id='pager-line'></li>").appendTo("ol.pager");

    function updatePagerLine($item) {
        var $parent = $item.closest('li');
        if ($parent.length) { 
            var leftPos = $parent.position().left;
            var width = $parent.outerWidth();            
            $pagerLine.css({
                "transform": `translateX(${leftPos}px)`,
                "width": `${width}px` 
            });
        }
    }
    updatePagerLine($(".current_page a"));
    $("ol.pager li").hover(
        function() {
            var $link = $(this).find("> a");
            updatePagerLine($link);
        },
        function() {
            updatePagerLine($(".current_page a"));
        }
    );
}
function gridtolist() {
    $('#products').addClass('grid-group-wrapper');
    $('#grid').addClass('active');
    const applyGridWrapper = () => {
        if (window.innerWidth <= 767) {
            $('#products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
            $('#grid').addClass('active');
            $('#list').removeClass('active');
        }
    };
    applyGridWrapper();
    $('#grid').click((event) => {
        event.preventDefault();
        $('#products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
        $('#grid').addClass('active');
        $('#list').removeClass('active');
    });
        $('#list').click((event) => {
        event.preventDefault();
        if (window.innerWidth > 767) {
            $('#products').removeClass('grid-group-wrapper').addClass('list-group-wrapper');
            $('#list').addClass('active');
            $('#grid').removeClass('active');
        }
    });
    $(window).resize(applyGridWrapper);
}

function rotation() {
    $('.createDell, .findPassword, .createPassword').hide();

    $('#createAccountButton').on('click', function() {
        $('.dark > div > div:first-of-type').addClass('rotate-card');
        $('.createDell').show();
        $('.findPassword, .createPassword').hide();
    });
    $('#cancelButton').on('click', function() {
        $('.dark > div > div:first-of-type').removeClass('rotate-card');
        $('.dellLogin').show();
        $('.findPassword, .createPassword').hide();
    });
    $('#accountVerificationButton').on('click', function() {
        $('.dark > div > div:first-of-type').addClass('rotate-card');
        $('.findPassword').show();
        $('.createDell, .createPassword').hide();
    });
    $('.findPassword button.cb04').on('click', function() {
        $('.dark > div > div:first-of-type').removeClass('rotate-card');
        $('.dellLogin').show();
        $('.createDell, .createPassword').hide();
    });
    $('#findPW button[type="submit"]').on('click', function(e) {
        var form = document.getElementById('findPW');
        
        if (form.checkValidity()) {
            e.preventDefault();
            $('.dark > div > div:first-of-type').removeClass('rotate-card');
            $('.dark > div > div:first-of-type').addClass('rotate-to-password');
            $('.createPassword').show();
            $('.dellLogin, .createDell').hide();
        } else {
            form.reportValidity();
        }
    });
}
function mouseLeave() {
    const $sort = $('#sort');

    $sort.on('focus', function () {
        $(this).addClass('focused');
    });

    $sort.on('mouseleave', function () {
        $(this).removeClass('focused');
    });
}
$(document).ready(function() {
    var fileName = window.location.pathname.split("/").pop();

    if (fileName.startsWith("detail")) {
        var isZoomed = false;
    
        $('nav.change ul li img').click(function() {
            var src = $(this).attr('src');
            $('.display-img, .zoom').attr('src', src);
            $('nav.change ul li').removeClass('selected');
            $(this).parent().addClass('selected');
        });
    
        $("nav.change ul li:first-of-type, div.legend nav ul li:first-of-type").addClass("selected");
    
        $('.legend nav ul li img').click(function() {
            var src = $(this).attr('src');
            $('.current-legend').attr('src', src);
            $('.img-legend').removeClass('selected');
            $(this).parent().addClass('selected');
        });
    
        var zoomImage = '<img class="zoom" src="' + $('.display-img').attr('src') + '">';
        $('.detailContainer > div:nth-of-type(3) > nav > div').addClass('big-img');
        $('.big-img').append(zoomImage);
    
        function applyZoom() {
            $('.detailContainer > div:nth-of-type(3) > nav > div').off('click');
            if (window.innerWidth >= 1280) {
                $('.detailContainer > div:nth-of-type(3) > nav > div').on('click', function(event) {
                    var container = $(this);
                    var zoomedImg = container.find('.zoom');
                    var offset = container.offset();
    
                    if (!isZoomed) {
                        container.find('.display-img').css({ opacity: 0 });
    
                        zoomedImg.css({
                            opacity: 1,
                            width: '140%'
                        });
    
                        var containerWidth = container.width();
                        var zoomedImgWidth = zoomedImg.width();
                        var leftBuffer = -400;
    
                        var initialLeft = (containerWidth - zoomedImgWidth) / 2;
    
                        zoomedImg.css({
                            left: initialLeft,
                            top: 0
                        });
    
                        $(document).on('mousemove.zoom', function(event) {
                            var left = event.pageX - offset.left;
                            var constrainedLeft = Math.max(containerWidth - zoomedImgWidth + leftBuffer, -left);
    
                            zoomedImg.css({
                                left: constrainedLeft,
                                top: -event.pageY + offset.top
                            });
                        });
    
                        container.addClass('zoomed');
                        isZoomed = true;
                    } else {
                        container.find('.display-img').css({ opacity: 1 });
                        zoomedImg.css({
                            opacity: 0,
                            width: '100%'
                        });
    
                        $(document).off('mousemove.zoom');
                        container.removeClass('zoomed');
                        isZoomed = false;
                    }
                });
            }
        }
    
        $(window).on('resize', applyZoom);
        applyZoom();
    

    }
    
});
$(document).ready(function () {
    var fileName = window.location.pathname.split("/").pop();
    if (!fileName.startsWith("detail")) return;
    function handleDesktopScroll() {
        var $thumbs = $('#thumbs');
        var scrollTop = $thumbs.scrollTop();
        var maxScrollTop = $thumbs[0].scrollHeight - $thumbs.outerHeight();

        toggleButtons(scrollTop > 0, scrollTop < maxScrollTop);

        $('nav.change button:first-of-type').off('click').on('click', function () {
            scrollThumbs($thumbs, 'scrollTop', '-=100');
        });

        $('nav.change button:last-of-type').off('click').on('click', function () {
            scrollThumbs($thumbs, 'scrollTop', '+=100');
        });
    }
    function handleMobileScroll() {
        var $thumbs = $('#thumbs');
        var $listItem = $thumbs.find('li').first();
        var listItemWidth = $listItem.outerWidth(true);
        var scrollLeft = $thumbs.scrollLeft();
        var maxScrollLeft = $thumbs[0].scrollWidth - $thumbs.outerWidth();
        toggleButtons(scrollLeft > 0, scrollLeft < maxScrollLeft);
        $('nav.change button:first-of-type').off('click').on('click', function () {
            scrollThumbs($thumbs, 'scrollLeft', `-=${listItemWidth}`);
        });
        $('nav.change button:last-of-type').off('click').on('click', function () {
            scrollThumbs($thumbs, 'scrollLeft', `+=${listItemWidth}`);
        });
    }
    function toggleButtons(showUp, showDown) {
        $('nav.change button:first-of-type').toggle(showUp);
        $('nav.change button:last-of-type').toggle(showDown);
    }
    function scrollThumbs($container, scrollDirection, value) {
        var scrollConfig = {};
        scrollConfig[scrollDirection] = value;
        $container.animate(scrollConfig, 300);
    }
    function applyScrollBehavior() {
        var isDesktop = window.matchMedia("(min-width: 1280px)").matches;
        var isMobile = window.matchMedia("(max-width: 767px)").matches;
        $('#thumbs').off('scroll');

        if (isDesktop) {
            handleDesktopScroll();
            $('#thumbs').on('scroll', handleDesktopScroll);
        } else if (isMobile) {
            handleMobileScroll();
            $('#thumbs').on('scroll', handleMobileScroll);
        } else {
            $('nav.change button').hide();
        }
    }
    applyScrollBehavior();
    $(window).on('resize', applyScrollBehavior);
});



