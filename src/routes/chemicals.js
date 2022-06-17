const express = require('express');
const router = express.Router();
const chemicalController = require('../controllers/chemicals');
let auth = require('../middleware/auth');

router
	// get summary of chemical (GET)
	.get('/chemicals', chemicalController.chemicalList)

	// get detail of a single chemical, given its id (GET)
	.get('/chemicals/:id', chemicalController.chemicalDetails)

	// create a new chemical (POST)
	.post('/chemicals', auth.verifyJWT, chemicalController.createChemical)

	//update a chemical, given its id (PUT)
	.put('/chemicals/:id', auth.verifyJWT, chemicalController.updateChemical)

	//delete a chemical, given its id (DELETE)
	.delete('/chemicals/:id', auth.verifyJWT, chemicalController.deleteChemical);

//export router module
module.exports = router;
