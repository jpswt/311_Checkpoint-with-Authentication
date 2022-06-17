const db = require('../models/connection');

// function that returns list of the chemicals in the response
let chemicalList = (req, res) => {
	console.log('chemical information');
	// parameterized sql statement that retrieves all information about the chemicals
	// in the response
	let sql = 'select * from chemicals';
	// database query for all information for chemicals in the database
	db.query(sql, (err, results) => {
		// handle error if something on our end goes wrong when executing
		// the query and return a Bad Request Error
		if (err) {
			console.log('Could not execute the query', err);
			res.sendStatus(400);
		} else {
			//respond with a list of all chemicals
			res.json(results);
		}
	});
};

// function that returns the details of a single chemical from the response

let chemicalDetails = (req, res) => {
	console.log('chemical details');
	// id from the path parameter
	let id = req.params.id;
	// parameterized sql statement for the id, chemical name and CAS number for a chemical
	// with a given id
	let sql = 'select id, chemicalName, casNumber from chemicals where id = ?';
	// create a new params array
	let params = [];
	// push id into the params array
	params.push(id);
	// database query for details on a chemical in the database
	db.query(sql, params, (err, results) => {
		// handle error if something on our end goes wrong when executing
		// the query and return a Bad Request Error
		// it is not the client fault the query failed
		if (err) {
			console.log('Could not execute the query', err);
			res.sendStatus(500);
		} else {
			// if id exists, return a single chemical object inside the array in the response
			if (results.length == 1) {
				res.json(results[0]);
				// if more that one id exists, return an internal server error as it is an
				// error on our side, not the clients
			} else if (results.length > 1) {
				console.log(`Found more than one result for the id: ${id}`);
				res.sendStatus(500);
				// if the id does not exits, return not found error as server could not
				// find the id requested by the client
			} else if (results.length == 0) {
				res.sendStatus(404);
			}
		}
	});
};

// function that creates a new chemical

let createChemical = (req, res) => {
	console.log('create chemical');
	// read input from req.body
	let input = req.body;
	// read chemicalName from req.body
	let chemicalName = input.chemicalName;
	// read casNumber from req.body
	let casNumber = input.casNumber;
	// read manufacturer from req.body
	let manufacturer = input.manufacturer;
	// if chemicalName is not present, send bad request error along with message
	// stating that a chemical name is required to create new chemical
	if (!chemicalName) {
		res.status(400).send('Chemical name is required');
		return;
	}
	// if casNumber is not present, send bad request error along with message
	// stating that a CAS number is required to create new chemical
	if (!casNumber) {
		res.status(400).send('CAS Number is required');
		return;
	}
	// parameterized sql statement that creates a new chemical.  In order to create,
	// a new chemical both a chemical name and CAS number must be provided.  The manufacturer
	// information is optional(can be NULL)
	let sql =
		'insert into chemicals(chemicalName, casNumber, manufacturer) values (?, ?, ?)';
	// params in the array
	let params = [chemicalName, casNumber, manufacturer];
	// database query to for creating a new chemical in database
	db.query(sql, params, (err, results) => {
		// handle error if something on our end goes wrong when executing
		// the query and return a Bad Request Error
		// it is not the client fault the query failed
		if (err) {
			console.log('Could not execute sql insert', err);
			res.sendStatus(500);
			// return a No Content success status response code indicates that a request has succeeded
			// even though there is nothing to return
		} else {
			res.sendStatus(204);
		}
	});
};

// function that updates the details of a single chemical with a given id

let updateChemical = (req, res) => {
	console.log('update chemical');
	// read id from req.params
	let id = req.params.id;
	// read body from req.body
	let body = req.body;
	// read chemical name from req.body
	let chemicalName = body.chemicalName;
	// read CAS number name from req.body
	let casNumber = body.casNumber;
	// read manufacturer from req.body
	let manufacturer = body.manufacturer;
	// if chemicalName is not present, send bad request error along with message
	// stating that a chemical name is required to update new chemical
	if (!chemicalName) {
		res.status(400).send('Chemical name is required');
		return;
	}
	// if casNumber is not present, send bad request error along with message
	// stating that a CAS number is required to update new chemical
	if (!casNumber) {
		res.status(400).send('CAS Number is required');
		return;
	}
	// parameterized sql statement that updates a chemical.  In order to update,
	// both a chemical name and CAS number must be provided in the body.  The manufacturer
	// information is optional(can be NULL)
	let sql =
		'update chemicals set chemicalName = ?, casNumber = ?, manufacturer = ? where id = ?';
	let params = [chemicalName, casNumber, manufacturer, id];
	// database query to for updating a chemical in database given its id
	db.query(sql, params, (err, results) => {
		// handle error if something on our end goes wrong when executing
		// the query and return a Bad Request Error
		// it is not the client fault the query failed
		if (err) {
			console.log('Could not execute update sql'.err);
			res.sendStatus(500); // not clients fault
			// return a No Content success status response code indicates that a request has succeeded
			// even though there is nothing to return
		} else {
			res.sendStatus(204);
		}
	});
};

// function that delete a chemical given an id

let deleteChemical = (req, res) => {
	console.log('delete chemical');
	// read id from path parameter
	let id = req.params.id;
	// parameterized sql statement that deletes a chemical.
	let sql = 'delete from chemicals where id = ?';
	// params array with id
	let params = [id];
	// database query to for deleting a chemical in database given its id
	db.query(sql, params, (err, results) => {
		// handle error if something on our end goes wrong when executing
		// the update query and return a Bad Request Error
		if (err) {
			console.log('Could not execute delete sql', err);
			res.sendStatus(500);
			// return a No Content success status response code indicates that a request has succeeded
			// even though there is nothing to return
		} else {
			res.sendStatus(204);
		}
	});
};
// export the chemicalList,chemicalDetails,createChemical,updateChemical,deleteChemical module
module.exports = {
	chemicalList,
	chemicalDetails,
	createChemical,
	updateChemical,
	deleteChemical,
};
