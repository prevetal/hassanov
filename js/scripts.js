WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Nutrients slider
	const nutrientsTabsSliders = [],
		nutrientsTabs = document.querySelectorAll('.test_item_info .nutrients .swiper')

	nutrientsTabs.forEach((el, i) => {
		el.classList.add('nutrients_tabs_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 8,
			slidesPerView: 'auto'
		}

		nutrientsTabsSliders.push(new Swiper('.nutrients_tabs_s' + i, options))
	})


	// Input password
	$('.form .toggle_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.line')

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? parent.find('.input').attr('type', 'text')
			: parent.find('.input').attr('type', 'password')
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Focus when clicking on the field name
	const formLabels = document.querySelectorAll('form .label')

	if (formLabels) {
		formLabels.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				el.closest('.line').querySelector('.input, textarea').focus()
			})
		})
	}


	// Tests
	$('body').on('click', '.tests .test .head', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.test')

		parent.toggleClass('active')
		parent.find('.data').slideToggle(300)
	})


	// Patients
	$('body').on('click', '.patients .patient .head', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.patient')

		parent.toggleClass('active')
		parent.find('.data').slideToggle(300)
	})


	// Test info - nutrients - list
	$('body').on('click', '.test_item_info .nutrients .list .spoler_btn', function (e) {
		e.preventDefault()

		$(this).toggleClass('active').closest('.head').next().slideToggle(300)
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Calendar
	const dateInputs = document.querySelectorAll('.date_input')

	if (dateInputs) {
		dateInputs.forEach((el, i) => {
			new AirDatepicker(el, {
				autoClose: true,
				maxDate: new Date(),
				dateFormat: 'dd-MM-yyyy'
			})
		})
	}


	// Schema
	let scale = 0.3

	$('.schema .btns .zoom_in_btn').click(function(e) {
		e.preventDefault()

		scale = scale + 0.1

		$('.schema .data').css('transform', 'translate(-50%, -50%) scale('+ scale +')')
	})

	$('.schema .btns .zoom_out_btn').click(function(e) {
		e.preventDefault()

		scale = scale - 0.1

		$('.schema .data').css('transform', 'translate(-50%, -50%) scale('+ scale +')')
	})

	$('.schema .btns .fullscreen_btn, .schema .btns .close_btn').click(function(e) {
		e.preventDefault()

		$('.schema').toggleClass('fullscreen')
	})


	// Free drag
	var draggable = document.getElementById('draggable'),
		mouseX, mouseY, startX, startY,
		isDragging = false


		// Start dragging
	function startDragging(e) {
		e.preventDefault()

		let event = (e.type === 'touchstart') ? e.touches[0] : e,
			styles = window.getComputedStyle(draggable)

		isDragging = true

		mouseX = event.clientX
		mouseY = event.clientY

		startX = parseFloat(styles.getPropertyValue('left'))
		startY = parseFloat(styles.getPropertyValue('top'))
	}

	if (draggable) {
		draggable.addEventListener('mousedown', startDragging)
		draggable.addEventListener('touchstart', startDragging)

		draggable.addEventListener('mousemove', e => {
			if (isDragging) {
				let offsetX = (mouseX - e.clientX) * -1,
					offsetY = (mouseY - e.clientY) * -1

				draggable.style.left = startX + offsetX + 'px'
				draggable.style.top = startY + offsetY + 'px'
			}
		})

		draggable.addEventListener('touchmove', e => {
			if (isDragging) {
				let offsetX = (mouseX - e.touches[0].clientX) * -1,
					offsetY = (mouseY - e.touches[0].clientY) * -1

				draggable.style.left = startX + offsetX + 'px'
				draggable.style.top = startY + offsetY + 'px'
			}
		})

		draggable.addEventListener('mouseup', () => isDragging = false)
		document.addEventListener('touchend', () => isDragging = false)
	}


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// LK profile
	$('.lk_profile .form .edit_btn').click(function(e) {
		e.preventDefault()

		let form = $(this).closest('form')

		$(this).addClass('active')

		form.find('.input').prop('readonly', false)
		form.find('.submit_btn').prop('disabled', false)
	})


	// Indicators - Sort
	$('body').on('click', '.indicators .titles .col_id.sort', function (e) {
		e.preventDefault()

		let list = $('.indicators .list'),
			items = list.children('.item')

		$('.indicators .item').each((i, el) => $(el).css('order', 0))

		if ($(this).hasClass('default')) {
			$(this).removeClass('default')
			$(this).addClass('up')

			items.each((i, el) => $(el).css('order', parseInt($(el).find('.col_id').text().match(/\d+/)[0])))
		} else if ($(this).hasClass('up')) {
			$(this).removeClass('up')
			$(this).addClass('down')

			items.each((i, el) => $(el).css('order', parseInt($(el).find('.col_id').text().match(/\d+/)[0])))

			$('.indicators .list').addClass('reverse')
		} else if ($(this).hasClass('down')) {
			$(this).removeClass('down')
			$(this).addClass('default')

			$('.indicators .list').removeClass('reverse')
		}
	})

	$('body').on('click', '.indicators .titles .col_value.sort', function (e) {
		e.preventDefault()

		let list = $('.indicators .list'),
			items = list.children('.item')

		$('.indicators .item').each((i, el) => $(el).css('order', 0))

		if ($(this).hasClass('default')) {
			$(this).removeClass('default')
			$(this).addClass('up')

			items.each((i, el) => $(el).css('order', $(el).find('.col_value').text().replace('.', '')))
		} else if ($(this).hasClass('up')) {
			$(this).removeClass('up')
			$(this).addClass('down')

			items.each((i, el) => $(el).css('order', $(el).find('.col_value').text().replace('.', '')))

			$('.indicators .list').addClass('reverse')
		} else if ($(this).hasClass('down')) {
			$(this).removeClass('down')
			$(this).addClass('default')

			$('.indicators .list').removeClass('reverse')
		}
	})

	$('body').on('click', '.indicators .titles .col_name.sort', function (e) {
		e.preventDefault()

		let list = $('.indicators .list'),
			items = list.find('.item'),
			itemsArray = []

		$('.indicators .item').each((i, el) => $(el).css('order', 0))

		if ($(this).hasClass('default')) {
			$(this).removeClass('default')
			$(this).addClass('up')

			items.each(function(index) {
				let textValue = $(this).find('.col_name').text().trim().toUpperCase()

				itemsArray.push({ element: $(this), value: textValue, originalIndex: index })
			})

			itemsArray.sort(function(a, b) {
				return (a.value < b.value) ? -1 : (a.value > b.value) ? 1 : 0
			})

			itemsArray.forEach((item, index) => item.element.css('order', index + 1))
		} else if ($(this).hasClass('up')) {
			$(this).removeClass('up')
			$(this).addClass('down')

			items.each(function(index) {
				let textValue = $(this).find('.col_name').text().trim().toUpperCase()

				itemsArray.push({ element: $(this), value: textValue, originalIndex: index })
			})

			itemsArray.sort(function(a, b) {
				return (a.value < b.value) ? -1 : (a.value > b.value) ? 1 : 0
			})

			itemsArray.forEach((item, index) => item.element.css('order', index + 1))

			$('.indicators .list').addClass('reverse')
		} else if ($(this).hasClass('down')) {
			$(this).removeClass('down')
			$(this).addClass('default')

			$('.indicators .list').removeClass('reverse')
		}
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})