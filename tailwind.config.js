/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				fadeOut: {
					"0%": { opacity: 1 },
					"100%": { opacity: 0 },
				},
				scaleIn: {
					"0%": { transform: "scale(0.9)" },
					"100%": { transform: "scale(1)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.3s ease-out",
				fadeOut: "fadeOut 0.3s ease-out",
				scaleIn: "scaleIn 0.3s ease-out",
			},
		},
	},
	plugins: [require("daisyui")],
};
