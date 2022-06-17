const jwt = require('jsonwebtoken');

let verifyJWT = (req, res, next) => {
	// get token from header and verify that it is good
	let header = req.get('Authorization');
	let signedToken;
	if (header) {
		let parts = header.split(' ');
		signedToken = parts[1];
	}

	// if token is good, proceed to controller portion of route
	if (signedToken) {
		try {
			jwt.verify(signedToken, process.env.JWT_SECRET);
			next();
		} catch (err) {
			res.sendStatus(400);
		}
		// if token is bad, return status 400
	} else {
		res.sendStatus(400);
	}
};

module.exports = { verifyJWT };
