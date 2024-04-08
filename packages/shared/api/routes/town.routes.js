const express = require('express');
const router = express.Router();
const TownController = require('../controllers/townController');


// get town route
router.post('/gettown', TownController.getTown)

// get towns route by userid
router.get('/gettowns', TownController.getTowns)

// create town route
router.post('/createtown', TownController.createTown)

// add user to town route
router.post('/adduser', TownController.addUser)

// delete town route
router.delete('/deletetown', TownController.deleteTown)

// remove users from town route
router.delete('/removeUser', TownController.removeUser)

module.exports = router;