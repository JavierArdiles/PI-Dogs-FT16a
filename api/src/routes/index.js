const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RaceRouter = require('./race');
const TempRouter = require('./temperament');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/dogs', RaceRouter);
// router.use('/temperaments', TempRouter);


module.exports = router;
