const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const nesting = require('tailwindcss/nesting');

const config = {
	plugins: [
		nesting(),
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		//But others, like autoprefixer, need to run after,
		//But others, like autoprefixer, need to run after,
		autoprefixer,
		autoprefixer
	]
};

module.exports = config;
