const express = require('express');
const router = express.Router();
let Claims = require('../models/claims');
const { model } = require('mongoose');

//GET: Get a list of users from MongoDB database
router.route('/').get((req, res) => {
    Claims.find()
      .then(cliams => res.json(cliams))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//POST: CREATE new and save
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const industry = req.body.industry;

    const newClaim = new Claims({name,industry}); 
    newClaim.save()
        .then(() => res.json('Claims added!'))
        .catch(err => res.status(400).json('Error: ' + err));
   
});

//GET: Get a specific user from MongoDB database
router.route('/:id').get((req, res) => {
    Claims.findById(req.params.id)
      .then(claim => res.json(claim))
      .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE: Delete a specific record from MongoDB database
router.route('/:id').delete((req, res) => {
    Claims.findByIdAndDelete(req.params.id)
      .then(() => res.json('Claims deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});
  
//POST: GET a specific record from MongoDB database and Update
router.route('/update/:id').post((req, res) => {
    Claims.findById(req.params.id)
      .then(claim => {
        claim._id = req.params.id;
        claim.name = req.body.name;
        claim.industry = req.body.industry;
        claim.save()
          .then(() => res.json('Claims updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;