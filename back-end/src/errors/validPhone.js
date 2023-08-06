const validator = require("validator");

function validPhone(req, res, next) {
	const { data } = req.body;
	let path = req.baseUrl;
	path = path.substring(1, path.length - 1);
	path = `${path}_mobile_number`;
	if (!validator.isMobilePhone(data[path], "any")) {
		const error = new Error(`${path} must be a valid phone number.`);
		error.status = 400;
		throw error;
	}
	next();
}

module.exports = validPhone;
