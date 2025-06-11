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
const supportCloseBtn = document.querySelector('.support-close-btn')
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

//Mobile menu
const toggleMenu = () => {
	mobileMenu.classList.toggle('opacity-1')
	mobileMenu.classList.toggle('-translate-y-full')
	mobileMenu.classList.toggle('top-[100px]')
}

// Clicking on links in the menu (closing)
menuLinks.forEach(link => {
	link.addEventListener('click', () => {
		toggleMenu()
	})
})

const handleOutsideClick = event => {
	const clickedInsideMenu = mobileMenu.contains(event.target)
	const clickedOnToggle = menuToggle.contains(event.target)

	if (!clickedInsideMenu && !clickedOnToggle && !mobileMenu.classList.contains('-translate-y-full')) {
		toggleMenu()
	}
}

// Clicking the hamburger (open/close)
menuToggle.addEventListener('click', event => {
	event.stopPropagation() // prevent event bubbling
	toggleMenu()
})

//------------------------------------------------------
// Hero-img animation

// callback for observer
const handleSectionIntersect = (entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			title.classList.add('visible')
			text.classList.add('visible')
			observer.unobserve(entry.target) // przestań obserwować po pierwszym pojawieniu się
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
const showPopup = () => {
	popup.classList.toggle('show-popup')
}

//-------------------------------------------
// Footer Year
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()

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

sectionObserver.observe(heroSection)
counterObserver.observe(counterBox)
supportCloseBtn.addEventListener('click', showPopup)
popupBtn.addEventListener('click', showPopup)
document.addEventListener('click', handleOutsideClick)
window.addEventListener('click', e => (e.target === popup ? showPopup() : false))
sendBtn.addEventListener('click', e => {
	e.preventDefault() // Don't send email. Demonstration purposes
	validateForm(e)
})
