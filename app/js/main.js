document.addEventListener('DOMContentLoaded', function () {
	$(function () {
		$('.product-slide__thumb').slick({
			asNavFor: '.product-slide__big',
			focusOnSelect: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			vertical: true,
			draggable: false,
			arrows: false,
		});
		$('.product-slide__big').slick({
			asNavFor: '.product-slide__thumb',
			draggable: false,
			arrows: false,
			fade: true,
		});

		$('.select-style, .product-one__num').styler();
		$('.filter-price__input').ionRangeSlider({
			type: 'double',
			prefix: '$',
			onStart: function (data) {
				$('.filter-price__from').text(data.from);
				$('.filter-price__to').text(data.to);
			},
			onChange: function (data) {
				$('.filter-price__from').text(data.from);
				$('.filter-price__to').text(data.to);
			},
		});
		$('.star').rateYo({
			starWidth: '15px',
			normalFill: '#ccccce',
			ratedFill: '#ffc35b',
			readOnly: true,
			starSvg:
				'<svg height="17px" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>',
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
	const tabs = document.querySelectorAll('.product-tabs__top-item');
	const tabsContent = document.querySelectorAll('.product-tabs__content-item');

	tabs.forEach((tab) => {
		tab.addEventListener('click', (e) => {
			e.preventDefault();
			//scoate clasele de la taburi
			tabs.forEach((tab) => {
				tab.classList.remove('product-tabs__top-item--active');
			});

			tab.classList.add('product-tabs__top-item--active');

			tabsContent.forEach((content) => {
				content.classList.remove('product-tabs__content-item--active');
			});

			const activeContent = document.querySelector(tab.getAttribute('href'));
			activeContent.classList.add('product-tabs__content-item--active');
		});
	});

	const shopContentFilterBtns = document.querySelectorAll('.shop-content__filter-btn');

	shopContentFilterBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			for (const btn of shopContentFilterBtns) {
				btn.classList.remove('shop-content__filter-btn--active');
			}
			btn.classList.add('shop-content__filter-btn--active');
		});
	});

	const btnGrid = document.querySelector('.btn-grid');
	const btnList = document.querySelector('.btn-list');
	const shio = document.querySelector('.shop-content__items');
	const productItems = document.querySelectorAll('.product-item');

	if (btnGrid) {
		btnGrid.addEventListener('click', () => {
			shio.classList.remove('shop-content__items--one');
			productItems.forEach((item) => {
				item.classList.add('product-item--grid');
				item.classList.remove('product-item--list');
			});
		});
	}
	if (btnList) {
		btnList.addEventListener('click', () => {
			shio.classList.add('shop-content__items--one');

			productItems.forEach((item) => {
				item.classList.add('product-item--list');
				item.classList.remove('product-item--grid');
			});
		});
	}

	function getTimeRemaining(endtime) {
		const total = Date.parse(endtime) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const days = Math.floor(total / (1000 * 60 * 60 * 24));

		return {
			total,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function initializeClock(id, endtime) {
		const clock = document.querySelector(id);
		const daysSpan = clock.querySelector('.promo__days');
		const hoursSpan = clock.querySelector('.promo__hours');
		const minutesSpan = clock.querySelector('.promo__minutes');
		const secondsSpan = clock.querySelector('.promo__seconds');

		function updateClock() {
			const t = getTimeRemaining(endtime);

			daysSpan.innerHTML = t.days;
			hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
			minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
			secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

			if (t.total <= 0) {
				daysSpan.innerHTML = '-';
				hoursSpan.innerHTML = '00';
				minutesSpan.innerHTML = '00';
				secondsSpan.innerHTML = '00';
				clearInterval(timeinterval);
			}
		}

		updateClock();
		const timeinterval = setInterval(updateClock, 1000);
	}

	// const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
	// const deadline = '2024-01-01';
	const promoClock = document.querySelector('.promo__clock');
	if (promoClock) {
		const attributePromoClock = promoClock.getAttribute('data-time');
		const deadline = attributePromoClock;

		if (deadline) {
			initializeClock('.promo__clock', deadline);
		}
	}
});
