/** @type {import('tailwindcss').Config} */
const defaultConfig = require("shadcn/ui/tailwind.config");

module.exports = {
	...defaultConfig,
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		...defaultConfig.theme,
		extend: {
			...defaultConfig.theme.extend,
			screens: {
				xs: "480px", // Móviles muy pequeños
			},
			boxShadow: {
				"pink-glow": "0 0 15px 6px rgba(212, 12, 99, 0.4)",
				"pink-glow-hover": "0 0 20px 8px rgba(212, 12, 99, 0.6)",
			},
			fontFamily: {
				...defaultConfig.theme.extend.fontFamily, // Mantiene las fuentes existentes de shadcn
				nunito: ["Nunito", "sans-serif"],
			},
			fontWeight: {
				...defaultConfig.theme.extend.fontWeight, // Mantiene los pesos existentes
				medium: 500,
				semibold: 600,
			},
			colors: {
				...defaultConfig.theme.extend.colors,
				primary: "#111420",
				pink: {
					DEFAULT: "#D40C63",
					dark: "#B00A54",
				},
				yellow: {
					DEFAULT: "#FCCE08",
					dark: "#E6B907",
				},
				blue: {
					DEFAULT: "#335BC6",
					dark: "#2A4BA3",
				},
				accent: "#335BC6",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				...defaultConfig.theme.extend.keyframes,
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				scaleIn: {
					"0%": { transform: "scale(0.9)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				pulse: {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.05)" },
				},
				slideUp: {
					from: { transform: "translateY(10px)", opacity: "0" },
					to: { transform: "translateY(0)", opacity: "1" },
				},
				slideDown: {
					from: { transform: "translateY(-10px)", opacity: "0" },
					to: { transform: "translateY(0)", opacity: "1" },
				},
			},
			animation: {
				...defaultConfig.theme.extend.animation,
				fadeIn: "fadeIn 0.5s ease-out",
				scaleIn: "scaleIn 0.3s ease-out",
				pulse: "pulse 0.5s ease-in-out",
				slideUp: "slideUp 0.3s ease-out",
				slideDown: "slideDown 0.3s ease-out",
			},
		},
	},
	plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
};
