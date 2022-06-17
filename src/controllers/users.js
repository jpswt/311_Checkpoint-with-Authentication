let db = require('../models/connection');
let jwt = require('jsonwebtoken');
let argon2 = require('argon2');

const register = async (req, res) => {
	console.log('register');
	// parameterized sql to insert a user into the database
	let sql = 'insert into users(email, pw_hash) values (? ,?)';
	let email = req.body.email;
	let password = req.body.password;
	// hashed password via the argon2 hashing algorithm
	let pwHash = await argon2.hash(password);
	let params = [email, pwHash];
	// database query that determines if the user can be added
	db.query(sql, params, (err, results) => {
		if (err) {
			console.log('Could not add user', err);
			res.sendStatus(500);
		} else {
			res.sendStatus(204);
		}
	});
};

// takes in user name and return a JWT, which can be used in subsequent
// requests to prove the user in authenticated
let login = async (req, res) => {
	console.log('login');

	let email = req.body.email;
	let password = req.body.password;

	let sql = 'select id, pw_hash from users where email = ?';
	let params = [email];

	db.query(sql, params, async (err, results) => {
		if (err) {
			console.log('Could not get password hash', err);
			return;
		}

		if (results.length > 1) {
			console.log('Returned more that one row for', email);
			res.sendStatus(500);
			return;
		}

		if (results.length == 0) {
			res.sendStatus(400);
			return;
		}

		let hash = results[0].pw_hash;
		let userId = results[0].id;

		let goodPassword = await argon2.verify(hash, password);

		let token = {
			email: email,
			user_id: userId,
		};

		if (goodPassword) {
			let signedToken = jwt.sign(token, process.env.JWT_SECRET);
			res.send(signedToken);
		} else {
			res.sendStatus(400);
		}
	});
};

module.exports = { register, login };
