module.exports = {
	reactStrictMode: false,
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
};
const removeImports = require('next-remove-imports')();
module.exports = removeImports({});
