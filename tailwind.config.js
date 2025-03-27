/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.9)' },
					'100%': { transform: 'scale(1)' },
				},
			},
			animation: {
				fadeIn: 'fadeIn 0.3s ease-out',
				fadeOut: 'fadeOut 0.3s ease-out',
				scaleIn: 'scaleIn 0.3s ease-out',
			},
			typography: {
				invert: {
					css: {
						'--tw-prose-body': '#fff',
						'--tw-prose-headings': '#fff',
						'--tw-prose-lead': '#fff',
						'--tw-prose-links': '#fff',
						'--tw-prose-bold': '#fff',
						'--tw-prose-counters': '#fff',
						'--tw-prose-bullets': '#fff',
						'--tw-prose-hr': '#fff',
						'--tw-prose-quotes': '#fff',
						'--tw-prose-quote-borders': '#fff',
						'--tw-prose-captions': '#fff',
						'--tw-prose-code': '#fff',
						'--tw-prose-pre-code': '#fff',
						'--tw-prose-pre-bg': 'rgb(43,43,43)',
						'--tw-prose-th-borders': '#fff',
						'--tw-prose-td-borders': '#fff',

						color: '#fff',
						'h1, h2, h3, h4, h5, h6': {
							color: '#fff',
						},
						'p, li, ul, ol': {
							color: '#fff',
						},
						'strong, em, code': {
							color: '#fff',
						},
						blockquote: {
							color: '#fff',
						},
					},
				},
			},
		},
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')],
};
