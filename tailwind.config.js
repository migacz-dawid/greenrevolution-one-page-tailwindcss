/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./docs/index.html', './node_modules/tw-elements/js/**/*.js'],
	theme: {
		extend: {
			colors: {
				'main-color': '#1B5E20',
				'second-color': '#43A047',
				'light-green': '#C8E6C9',
				'light-white': '#eee',
				 dark: '#2e2e2e',
				'pure-white': '#fff',
				'btn-color': '#FF5722',
				'hover-btn': '#D84315' 
			},
			fontFamily: {
				quicksand: ['Quicksand', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
			},
			keyframes: {
				'show-popup': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
      animation: {
        'show-popup': 'show-popup .3s ease-in-out forwards',
      },
		},
	},
	plugins: [require('tw-elements/plugin.cjs')],
}
