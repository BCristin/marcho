$(function () {
	$('.star').rateYo({
		startWidth: '17px',
		normalFill: '#ccccce',
		ratedFill: '#ffc35b',
		readOnly: true,
	});
	$('.top-slider__inner').slick({
		dots: true,
		arrows: false,
		fade: true,
		autoplay: true,
		autoplaySpeed: 2000,
	});
});

Fancybox.bind('[data-fancybox]', {
	// Your custom options
});
