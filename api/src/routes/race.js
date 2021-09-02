const { Router } = require('express');
const { getRaces, getRaceById, postRace } = require('../controllers/race');

const router = Router();

// router.get('/dogs', getRaces);

// router.get('/dogs/{idRaza}', getRaceById);

// router.post('/dog', postRace);

module.exports = router;