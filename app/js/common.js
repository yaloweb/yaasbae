$(function() {

	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.header-search').length ) {
			$('.search-dropdown').removeClass('opened');
			closeSearchResults();
		}
    if ( !$(e.target).closest('.catalog-sort').length ) {
      $('.catalog-sort-selected').removeClass('opened');
      $('.catalog-sort-dropdown').removeClass('opened');
    }
    if ( !$(e.target).closest('.acc-links-nav').length ) {
      $('.acc-menu').removeClass('opened');
    }
    if ( !$(e.target).closest('.header-catalog').length && !$(e.target).closest('.open-header-catalog-btn').length ) {
      $('.header-catalog').removeClass('opened');
      $('.header-catalog .has-child ul').removeClass('opened');
      catalogHasScroll();
    }
	});

	$('.search-link').on('click', function(e) {
		e.preventDefault();
		$('.search-dropdown').addClass('opened')
	});

	$('.search-dropdown-close').on('click', function() {
		$('.search-dropdown').removeClass('opened');
		closeSearchResults();
	});

	$('.search-input').on('input', function() {
		let ths = $(this);
		if ( ths.val().trim().length > 0 ) {
			$('.search-autocomplete').show();
			$('.search-results').show();
			setTimeout(() => {
				$('.search-results').addClass('opened')
			}, 50);
		}
		else {
			closeSearchResults();
		}
	});

	function closeSearchResults() {
		$('.search-autocomplete').hide();
		$('.search-results').removeClass('opened');
		setTimeout(() => {
			$('.search-results').hide();
		}, 400);
	}

	let leftBannersThumbs = $('.left-banners-thumbs'),
			leftBannersImages = $('.left-banners-images'),
      storiesTime = 4000,
      storiesInterval;

	leftBannersThumbs.owlCarousel({
		items: 5,
		autoWidth: true,
		dots: false,
		nav: false
	});

	leftBannersImages.owlCarousel({
		items: 1,
		touchDrag: false,
		mouseDrag: false,
		dots: false,
		nav: false,
		smartSpeed: 500
	});

  $('.left-banners-thumb')

  $('.left-banners-thumb').each(function(i) {
    $('.left-banners-images-stories-tape').append('<span><b></b></span>');
    if ( i == 0 ) {
      $('.left-banners-images-stories-current').html('').append($(this).html());
    }
  });

  function eachStoriesItem(i) {
    $('.left-banners-images-stories-tape').find('span').each(function(e) {
      let ths = $(this),
      progress = ths.find('b');
      if ( e < i ) {
        progress.removeAttr('style').css({
          '-webkit-transform': 'scaleX(1)',
          '-ms-transform': 'scaleX(1)',
          'transform': 'scaleX(1)',
        })
      }
      else if ( e == i ) {
        progress.removeAttr('style');
        setTimeout(() => {
          progress.css({
            '-webkit-transition': `-webkit-transform ${storiesTime - 1}ms linear`,
            '-o-transition': `transform ${storiesTime - 1}ms linear`,
            'transition': `transform ${storiesTime - 1}ms linear`,
            '-webkit-transform': `scaleX(1)`,
            '-ms-transform': `scaleX(1)`,
            'transform': `scaleX(1)`,
          });
        }, 1)
        nextStoriesSlide();
      }
      else {
        progress.removeAttr('style')
      }
    });
  }

  leftBannersImages.on('translate.owl.carousel', function(i) {
    let id = i.item.index;
    eachStoriesItem(id);
    currentStoriesThumb(id);
    $('.left-banners-thumb').eq(id).addClass('viewed');
    $('.left-banners-images-block').addClass('opened');
  });
 
  leftBannersImages.on('translated.owl.carousel', function() {
    leftBannersImages.addClass('visible');
  });

  function currentStoriesThumb(i) {
    $('.left-banners-images-stories-current')
      .html($('.left-banners-thumb').eq(i).html())
      .attr('href', $('.left-banners-image').eq(i).find('a').attr('href'));
  }

  function nextStoriesSlide() {
    clearTimeout(storiesInterval);
    storiesInterval = setTimeout(() => {
      if ( $('.left-banners-images-block').is(':visible') ) {
        leftBannersImages.trigger('next.owl.carousel')
      }
    }, storiesTime)
  }

  function leftBannersActive(event) {
    let i = event.item.index;
    leftBannersThumbs.eq(i).addClass('active');
		leftBannersImages.trigger('to.owl.carousel', i);
		$('.left-banners-thumb').removeClass('active').eq(i).addClass('active');
	}

  let storiesBlock = $('.left-banners-images-block'),
      firstStoriesClick = true;

	$('.left-banners-thumb').on('click', function() {
		let i = $(this).index('.left-banners-thumb');
		$('.left-banners-thumb').removeClass('active');
		$(this).addClass('active').addClass('viewed');
		leftBannersImages.trigger('to.owl.carousel', i);
    currentStoriesThumb(i);
    if ( $(window).width() < 768 ) {
      storiesBlock.show();
      setTimeout(() => {
        storiesBlock.addClass('opened')
      }, 50);
      setTimeout(() => {
        firstStoriesClick ? leftBannersImages.addClass('visible') : '';
        firstStoriesClick = false;
        if ( i == 0 ) {
          let firstItem = $('.left-banners-images-stories-tape').find('span').eq(0).find('b');
          leftBannersImages.trigger('to.owl.carousel', i);
          firstItem.removeAttr('style');
          setTimeout(() => {
            firstItem.css({
              '-webkit-transition': `-webkit-transform ${storiesTime - 1}ms linear`,
              '-o-transition': `transform ${storiesTime - 1}ms linear`,
              'transition': `transform ${storiesTime - 1}ms linear`,
              '-webkit-transform': `scaleX(1)`,
              '-ms-transform': `scaleX(1)`,
              'transform': `scaleX(1)`,
            });
          }, 1)
        }
        else {
          let currItem = $('.left-banners-images-stories-tape').find('span').eq(i).find('b');
          leftBannersImages.trigger('to.owl.carousel', i);
          currItem.removeAttr('style');
          eachStoriesItem(i);
        }
      }, 10)
    }
	});

  $('.left-banners-images-stories-close').on('click', closeStories);

  function closeStories() {
    storiesBlock.removeClass('opened');
    setTimeout(() => {
      storiesBlock.hide();
      leftBannersImages.removeClass('visible');
      $('.left-banners-images-stories-tape').find('span b').removeAttr('style');
    }, 400)
  }

  $('.left-banners-promo-slider').owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: true
  })

	$('.main-banners').owlCarousel({
		items: 1,
		nav: true,
		loop: true,
		smartSpeed: 500,
		dots: false
	});

	$('.promo-slider').owlCarousel({
		items: 1,
		margin: 20,
		dots: false,
		nav: true,
    responsive: {
      0: {
        margin: 12
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        margin: 30,
        items: 3
      }
    }
	});

	$('.products-slider').owlCarousel({
		items: 4,
		nav: true,
		dots: false,
		margin: 20,
    responsive: {
      0: {
        margin: 12,
        items: 2
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        margin: 30
      }
    }
	});

	$('.product-liked').on('click', function() {
		$(this).toggleClass('active')
	});

	$('.total-look-slider').owlCarousel({
		items: 2,
		loop: false,
		center: false,
		nav: true,
		dots: false,
		margin: 20,
		touchDrag: true,
		mouseDrag: false,
    responsive: {
      0: {
        items: 1,
        center: true,
        loop: true,
      },
      576: {
        items: 2,
        center: false,
        loop: false,
      },
      992: {
        touchDrag: false,
        items: 3,
        center: true,
        margin: 30,
        loop: true,
      }
    }
	});

	$('.instagram-slider').owlCarousel({
		items: 5,
		autoWidth: true,
		margin: 18,
		nav: false,
		dots: false,
		center: true,
		loop: true,
    responsive: {
      0: {
        margin: 10
      },
      1200: {
        margin: 18
      }
    }
	});

	function openPopup(id, noClose = false) {
  	let notCurrentPopups = $(`.popup-wrapper:not(${id})`);
    if ( !noClose ) {
      notCurrentPopups.removeClass('opened');
      setTimeout(() => {
        notCurrentPopups.hide()
      }, 400);
    }
  	$(id).show();
  	setTimeout(() => {
  		$(id).addClass('opened')
  	}, 50);
  }

  function closePopup(id) {
  	$(id).removeClass('opened');
  	setTimeout(() => {
  		$(id).hide()
  	}, 400);
  	$('.header-mobile-universal-close').removeClass('visible');
  }

  $(document).on('click', '.open-popup', function(e) {
  	e.preventDefault();
  	let id = $(this).attr('href'),
        noClose = false;
    $(this).hasClass('no-close-popup') ? noClose = true : noClose = false;
  	openPopup(id, noClose);
  });

  $('.popup-close, .popup-bg').on('click', function(e) {
      e.preventDefault();
      let id = $(this).parents('.popup-wrapper').attr('id');
      closePopup(`#${id}`);
  });

  $('.auth-link').on('click', function(e) {
  	e.preventDefault();
  	let ths = $(this),
  			wrapper = ths.parents('.auth-wrapper'),
  			thsTab = wrapper.find(`.auth-block[data-tab=${ths.data('tab')}]`);
  	if ( thsTab.is(':hidden') ) {
  		wrapper.find('.auth-link').removeClass('active');
  		ths.addClass('active');
  		wrapper.find('.auth-block').hide();
  		thsTab.fadeIn(400);
  	}
  });

  $('.phone-mask').inputmask({
  	mask: "+7 999 999 99 99",
  	showMaskOnHover: false
  });

  $('.date-mask').inputmask({
    mask: "99.99.9999",
    showMaskOnHover: false
  });

  $('.check-password').on('click', function() {
  	let ths = $(this),
  			inp = ths.parent().find('input');
  	if ( inp.attr('type') == 'password' ) {
  		inp.attr('type', 'text');
  		ths.addClass('active');
  	}
  	else {
  		inp.attr('type', 'password');
  		ths.removeClass('active');
  	}
  });

  $('.only-number').on('keydown', function (e) {
  	if (e.key.length == 1 && e.key.match(/[^0-9'"]/)) {
  		return false;
  	};
  });

  let filterWrapper = $('.filter-sidebar'),
  		helpBtn = filterWrapper.find('.filter-help-btn'),
  		checkboxes = filterWrapper.find('.checkbox input'),
  		rangeInputs = filterWrapper.find('.slider-range-inp input'),
  		selectColor = filterWrapper.find('.select-color-item input'),
  		helpBtnVisibleTime;

  function setHelpBtnPosition(item) {
  	let ths = item,
  			filterTop = filterWrapper.offset().top,
  			thsTop = ths.offset().top;
  	clearTimeout(helpBtnVisibleTime);
  	helpBtn.css('top', thsTop - filterTop - helpBtn.outerHeight() / 2 + ths.outerHeight() / 2 + 'px');
  	helpBtn.addClass('visible');
  	helpBtnVisibleTime = setTimeout(() => {
  		helpBtn.removeClass('visible');
  	}, 5000);
  }

  checkboxes.on('change', function() {
  	setHelpBtnPosition($(this));
  });

  rangeInputs.on('change', function() {
  	setHelpBtnPosition($(this));
  });

  selectColor.on('change', function() {
  	setHelpBtnPosition($(this));
  });

  $('.slider-range-item').each(function () {
  	let ths = $(this),
		  	left = ths.find('.slider-range-left'),
		  	right = ths.find('.slider-range-right'),
		  	range = ths.find('.slider-range'),
		  	min = parseInt(left.data('min')),
		  	max = parseInt(right.data('max')),
		  	currentMin = parseInt(left.val()),
		  	currentMax = parseInt(right.val());
  	range.slider({
  		range: true,
  		min: min,
  		max: max,
  		values: [currentMin, currentMax],
  		slide: function slide(event, ui) {
  			left.val(ui.values[0]).change();
  			right.val(ui.values[1]).change();
  		}
  	});
  	left.val(range.slider('values', 0));
  	right.val(range.slider('values', 1));
  	left.on('input', function () {
  		let thsNumb = parseInt($(this).val());
  		left.val(thsNumb).change();

  		if (isNaN(thsNumb)) {
  			left.val(0).change();
  		} else if (thsNumb > max) {
  			left.val(max).change();
  		}

  		currentMin = thsNumb;
  		range.slider({
  			"values": [thsNumb, parseInt(right.val())]
  		});
  	});
  	right.on('input', function () {
  		let thsNumb = parseInt($(this).val());
  		right.val(thsNumb).change();

  		if (isNaN(thsNumb)) {
  			right.val(0).change();
  		} else if (thsNumb > max) {
  			right.val(max).change();
  		}

  		currentMax = thsNumb;
  		range.slider({
  			"values": [parseInt(left.val()), thsNumb]
  		});
  	});
  });

  $('.filter-title').on('click', function() {
  	let ths = $(this);
  	ths.toggleClass('closed');
  	ths.parent().find('.filter-body').slideToggle(400);
  });

  $('.catalog-tabs').owlCarousel({
  	items: 5,
  	autoWidth: true,
  	margin: 10,
  	nav: true,
  	dots: false,
    onTranslate: catalogTabsNav,
    onInitialized: catalogTabsNav,
    onResized: catalogTabsNav,
    mouseDrag: false
  });

  function catalogTabsNav() {
    let catalogTabs = $('.catalog-tabs').find('.owl-nav button');
    if ( $('.catalog-tabs').find('.owl-nav button.disabled').length == 2 ) {
      catalogTabs.addClass('disabled-btn')
    }
    else {
      catalogTabs.removeClass('disabled-btn')
    }
  }

  $('.catalog-sort-selected').on('click', function() {
    let ths = $(this);
    ths.toggleClass('opened');
    $('.catalog-sort-dropdown').toggleClass('opened');
  });

  $('.recently-viewed-slider').owlCarousel({
    items: 5,
    loop: false,
    nav: true,
    dots: false,
    margin: 30
  });

  let prodImgGallery = $('.product-images-gallery');

  prodImgGallery.owlCarousel({
    items: 1,
    nav: true,
    dots: false
  });

  $(window).on('load', function() {
    prodImgGallery.trigger('refresh.owl.carousel')
  });

  $('.product-image-thumb').on('click', function() {
    let i = $(this).index('.product-image-thumb');
    prodImgGallery.trigger('to.owl.carousel', i);
    $('.product-image-thumb').removeClass('active');
    $(this).addClass('active');
  });

  prodImgGallery.on('translate.owl.carousel', function(e) {
    $('.product-image-thumb').removeClass('active').eq(e.item.index).addClass('active');
  });

  $('.product-video-play').on('click', function() {
    let ths = $(this);
    if ( !ths.hasClass('active') ) {
      $('.product-video').get(0).play();
     ths.addClass('active')
    }
    else {
      $('.product-video').get(0).pause();
      ths.removeClass('active')
    }
  });

  $('.product-page-color').on('change', function() {
    $('.product-page-selected-color span').text(`${$('.product-page-color:checked + span').text()}`)
  });

  $('.size-item').on('change', function() {
    $(this).parents('.product-page-size').find('.product-page-selected-size span').text(`${$('.size-item:checked + span').text()}`)
  });

  $(document).on('input', '.number-input', function () {
    var wd = $(this).val().substr(0, 1);
    if ($(this).val().length == 0) {
      $(this).val(0);
    } else if (wd == '0') {
      $(this).val($(this).val().substr(1));
    }
  });

  $(document).on('click', '.number-minus', function () {
    var input = $(this).parent().find('.number-input');
    console.log($(this).parent().find('.number-minus'));
    if (parseInt(input.val()) > 1) {
      input.val(parseInt(input.val()) - 1);
      if ( parseInt($(this).parent().find('.number-input').val()) < 2 ) {
        $(this).parent().find('.number-minus').prop('disabled', true);
      }
    }
    else if (parseInt(input.val()) < 3) {
      $(this).parent().find('.number-minus').prop('disabled', true);
    }
  });

  $(document).on('click', '.number-plus', function () {
    var input = $(this).parent().find('.number-input');
    input.val(parseInt(input.val()) + 1);
    $(this).parent().find('.number-minus').prop('disabled', false);
  });

  $('.number-group').each(function() {
    if ( $(this).find('.number-input').val() == '1' ) {
      $(this).find('.number-minus').prop('disabled', true);
    }
  });


  $('.product-descr-link').on('click', function(e) {
    e.preventDefault();
    let ths = $(this),
        thsTab = $(`.product-descr-tab[data-tab=${ths.data('tab')}]`);
    if ( thsTab.is(':hidden') ) {
      $('.product-descr-link').removeClass('active');
      ths.addClass('active');
      $('.product-descr-tab').hide();
      thsTab.fadeIn(400);
    }
  });

  $('.lookbook-images-slider').owlCarousel({
    items: 1,
    nav: true,
    dots: false
  });

  $('.lookbook-dot').on('click', function() {
    let ths = $(this);
    $('.lookbook-dot').each(function(i) {
      if ( ths.index('.lookbook-dot') != i ) {
        $(this).removeClass('active');
      }
    });
    $(this).toggleClass('active');
  });

  $('.select-size-form .form-submit .btn').on('click', function(e) {
    closePopup(e);
    openAlert('#add-prod-alert');
  });

  function openAlert(id) {
    $(id).addClass('opened');
    setTimeout(() => {
      $(id).removeClass('opened')
    }, 4000)
  }

  $('.alert-close').on('click', function() {
    $('.alert').removeClass('opened');
  });

  $('.images-slider').owlCarousel({
    items: 1,
    nav: true,
    dots: true
  });

  $('.article-slider').owlCarousel({
    items: 3,
    margin: 30,
    nav: true,
    dots: false
  });

  $('.select-style').select2({
    minimumResultsForSearch: -1,
    width: '100%'
  });

  $('.open-acc-menu').on('click', function(e) {
    e.preventDefault();
    $('.acc-menu').toggleClass('opened')
  });

  $('.filter-link').on('click', function(e) {
    e.preventDefault();
    let filter = $(this).data('filter');
    $('.filter-link').removeClass('active');
    $(this).addClass('active');
    if ( filter == 'all' ) {
      $('.orders-tab').fadeIn(400)
    }
    else {
      $('.orders-tab').hide();
      $(`.orders-tab[data-filter=${filter}]`).fadeIn(400)
    }
  });

  $('.invite-friends').each(function() {
    let ths = $(this);
    ths.find('.copy-promocode').on('click', function(e) {
      e.preventDefault();
      let inp = ths.find('.promocode-input').eq(0);
      inp.select();
      document.execCommand('copy');
      ths.find('.promocode-copied').addClass('active');
      setTimeout(() => {
        ths.find('.promocode-copied').removeClass('active')
      }, 3000)
    });
  });

  let catalogScrollTop = 0;
  const touchPrevent = e => {
    e.preventDefault();
  }

  function catalogNoScroll() {
    $('.header-catalog').addClass('mob-no-scroll');
    document.addEventListener('touchmove', touchPrevent, { passive: true });
    catalogScrollTop = $('.header-catalog').scrollTop();
    $('.header-catalog').scrollTop(0)
  }

  function catalogHasScroll() {
    $('.header-catalog').removeClass('mob-no-scroll');
    document.removeEventListener('touchmove', touchPrevent, { passive: true });
    $('.header-catalog').scrollTop(catalogScrollTop);
    catalogScrollTop = 0;
  }

  $('.open-header-catalog-btn').on('click', function() {
    $('.header-catalog').addClass('opened');
    catalogHasScroll();
  });

  $('.header-catalog-close').on('click', function() {
    $('.header-catalog').removeClass('opened');
    $('.header-catalog .has-child ul').removeClass('opened');
    catalogHasScroll();
  });

  $('.header-catalog .has-child > a').on('click', function(e) {
    if ( $(window).width() < 1200 && $(window).width() > 991.98 ) {
      e.preventDefault();
    }
    else if ( $(window).width() < 992 ) {
      e.preventDefault();
      $(this).parent().find('ul').addClass('opened');
      $('.submenu-header-back').text($(this).text());
      catalogNoScroll();
    }
  });
  
  $('.submenu-header-back').on('click', function() {
    $('.header-catalog .has-child ul').removeClass('opened');
    catalogHasScroll();
  });

  $('.check-look').on('click', function(e) {
    e.preventDefault();
    let popCont = $(this).parents('.total-look-item').find('.total-look-for-popup').html();
    $('.popup-lookbook').html(popCont);
    openPopup('#lookbook');
  });

  $('.mob-menu-accordion-item').each(function() {
    let ths = $(this);
    ths.find('.mob-menu-accordion-title').on('click', function() {
      $(this).toggleClass('opened');
      ths.find('.mob-menu-accordion-body').slideToggle(400)
    });
  });

  $('.header-menu-btn').on('click', function() {
    $('.mob-menu-block').addClass('opened');
  });

  $('.mob-menu-close').on('click', function() {
    $('.mob-menu-block').removeClass('opened');
  });

  $('.footer-nav').each(function() {
    let ths = $(this);
    ths.find('.h5').on('click', function() {
      $(this).toggleClass('opened');
      ths.find('ul').slideToggle(400)
    });
  });

});
