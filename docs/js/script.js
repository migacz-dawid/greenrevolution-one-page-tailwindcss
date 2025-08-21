//Mobile menu
const menuToggle = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')
const menuLinks = document.querySelectorAll('#mobile-menu a')
//Hero-img
const heroSection = document.querySelector('.hero-img')
const title = heroSection.querySelector('.hero-img__title')
const text = heroSection.querySelector('.hero-img__text')
//Counter
const counterItems = document.querySelectorAll('.counter')
const counterBox = document.querySelector('.counter-boxes')
//Support popup
const popup = document.querySelector('.support__popup ')
const popupBtn = document.querySelector('.support__popup-box-btn')
const supportOpenBtn = document.querySelector('.support-open-btn ')
//Contact form
const msgStatus = document.querySelector('.contact-status')
const username = document.querySelector('#name')
const email = document.querySelector('#email')
const msg = document.querySelector('#msg')
const checkBox = document.querySelector('#consent')
const contactSatus = document.querySelector('.contact-error')
const sendBtn = document.querySelector('.contact-btn')
//Footer Year
const footerYear = document.querySelector('.footer-year')

// Option for IntersectionObserver for sections
const visibilityOptions = {
	threshold: 0.5, // section must be 50% visible
}

// Options for IntersectionObserver for counter
const counterObserverOptions = {
	rootMargin: '-100px',
}

// Release Focus Trap for support popup
let releaseFocusTrap = null

// Mobile Menu
// Function for focus trap
const trapFocusMobile = e => {
	const focusable = [menuToggle, ...Array.from(menuLinks)]
	const first = focusable[0]
	const last = focusable[focusable.length - 1]

	if (e.key === 'Tab') {
		if (e.shiftKey) {
			if (document.activeElement === first) {
				e.preventDefault()
				last.focus()
			}
		} else {
			if (document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}
	}
}

// Function for toggle menu
const toggleMenu = () => {
	if (mobileMenu.classList.contains('hidden')) {
		// Menu is open
		mobileMenu.classList.remove('hidden')
		mobileMenu.classList.add('flex')
		mobileMenu.setAttribute('aria-hidden', 'false')
		menuToggle.setAttribute('aria-expanded', 'true')

		setTimeout(() => {
			mobileMenu.classList.remove('-translate-y-full')
			mobileMenu.classList.add('opacity-1')
			mobileMenu.classList.add('top-[100px]')
		}, 100)

		document.addEventListener('keydown', trapFocusMobile)
		document.addEventListener('keydown', handleEscape)
		menuToggle.focus()
	} else {
		// Menu close
		mobileMenu.classList.add('-translate-y-full')
		mobileMenu.classList.remove('opacity-1')
		mobileMenu.classList.remove('top-[100px]')
		menuToggle.setAttribute('aria-expanded', 'false')

		setTimeout(() => {
			mobileMenu.classList.add('hidden')
			mobileMenu.classList.remove('flex')
			menuToggle.focus()
			mobileMenu.setAttribute('aria-hidden', 'true')
		}, 300)

		document.removeEventListener('keydown', trapFocusMobile)
		document.removeEventListener('keydown', handleEscape)
	}
}

// Function for toggle menu escape
const handleEscape = e => {
	if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
		toggleMenu()
	}
}

// Clicking outside the menu
const handleOutsideClick = event => {
	const clickedInsideMenu = mobileMenu.contains(event.target)
	const clickedOnToggle = menuToggle.contains(event.target)

	if (!clickedInsideMenu && !clickedOnToggle && !mobileMenu.classList.contains('-translate-y-full')) {
		toggleMenu()
	}
}

//------------------------------------------------------
// Hero-img animation
// callback for observer
const handleSectionIntersect = (entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			title.classList.add('visible')
			text.classList.add('visible')
			observer.unobserve(entry.target) // unobserve after animation
		}
	})
}
const sectionObserver = new IntersectionObserver(handleSectionIntersect, visibilityOptions)

//-------------------------------------------
// Counter
// callback for IntersectionObserver for counter
const handleCounterIntersect = (entries, observer) => {
	const [entry] = entries
	if (!entry.isIntersecting) return

	counterItems.forEach(counter => {
		const finalNumber = parseInt(counter.getAttribute('data-number'), 10)
		let currentValue = 0
		const increment = finalNumber / 300

		const updateCounter = () => {
			currentValue = Math.min(currentValue + increment, finalNumber)
			counter.textContent = Math.floor(currentValue)

			if (currentValue < finalNumber) {
				setTimeout(updateCounter, 1)
			}
		}

		updateCounter()
	})

	// after the counter is done, unobserve
	observer.unobserve(entry.target)
}

// initialize observer
const counterObserver = new IntersectionObserver(handleCounterIntersect, counterObserverOptions)

//-------------------------------------------
//Support POPUP
const trapFocus = modalElement => {
	const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	const focusableElements = modalElement.querySelectorAll(focusableSelectors)

	if (!focusableElements.length) return

	const firstElement = focusableElements[0]
	const lastElement = focusableElements[focusableElements.length - 1]

	const handleTab = e => {
		if (e.key !== 'Tab') return

		if (e.shiftKey) {
			// Shift + Tab
			if (document.activeElement === firstElement) {
				e.preventDefault()
				lastElement.focus()
			}
		} else {
			// Tab
			if (document.activeElement === lastElement) {
				e.preventDefault()
				firstElement.focus()
			}
		}
	}

	modalElement.addEventListener('keydown', handleTab)

	return () => modalElement.removeEventListener('keydown', handleTab)
}

const openPopup = () => {
	popup.classList.add('show-popup')
	popup.setAttribute('aria-hidden', 'false')
	supportOpenBtn.setAttribute('aria-expanded', 'true')
	popupBtn.focus()
	releaseFocusTrap = trapFocus(popup)
}

const closePopup = () => {
	popup.classList.remove('show-popup')
	popup.setAttribute('aria-hidden', 'true')
	supportOpenBtn.setAttribute('aria-expanded', 'false')
	supportOpenBtn.focus()

	if (releaseFocusTrap) releaseFocusTrap()
}

//-------------------------------------------
//Contact Form
const showError = message => {
	contactSatus.textContent = message
}

const clearError = () => {
	contactSatus.textContent = ''
}

const checkForm = () => {
	if (username.value === '' || email.value === '' || msg.value === '') {
		showError('Nie uzupełniono wszystkich pól!')
		return false
	} else {
		clearError()
		return true
	}
}

const checkMail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value) && email.value !== '') {
		clearError()
		return true
	} else {
		showError('Email jest niepoprawny')
		return false
	}
}

const ischecked = () => {
	if (!checkBox.checked) {
		showError('Nie wyrażono zgody!')
		return false
	} else {
		clearError()
		return true
	}
}

const sendStatus = () => {
	username.value = ''
	email.value = ''
	msg.value = ''
	checkBox.checked = false
	alert('Email został wysłany')
}

const validateForm = event => {
	clearError()

	if (!checkForm()) {
		event.preventDefault()
		return
	}

	if (!checkMail(email)) {
		event.preventDefault()
		return
	}

	if (!ischecked()) {
		event.preventDefault()
		return
	}

	sendStatus()
}
//-------------------------------------------
// Footer Year
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()

//--------------------------------------------------

// Clicking on links in the menu (closing)
menuLinks.forEach(link => {
	link.addEventListener('click', () => {
		toggleMenu()
	})
})

// Clicking the hamburger (open/close)
menuToggle.addEventListener('click', event => {
	event.stopPropagation() // prevent event bubbling
	toggleMenu()
})

supportOpenBtn.addEventListener('click', openPopup)
popupBtn.addEventListener('click', closePopup)

sendBtn.addEventListener('click', e => {
	e.preventDefault() // Don't send email. Demonstration purposes
	validateForm(e)
})

sectionObserver.observe(heroSection)
counterObserver.observe(counterBox)

document.addEventListener('click', handleOutsideClick)
window.addEventListener('click', e => {
	if (e.target === popup) closePopup()
})
