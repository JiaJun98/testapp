const express = require('express');
const controller = require('./index');
const router = express.Router();

//Routing for post request
router.post(
    '/api/insert',
    (req,res) => {
        controller.insert(req.body, res);
    }
)



module.exports = router;