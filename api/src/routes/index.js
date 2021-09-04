const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Race, Temperament } = require('../db');
require('dotenv').config();

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/dogs', RaceRouter);
// router.use('/temperaments', TempRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            temperament: el.temperament,
            image: el.image.url,
        }
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Race.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            throught: {
                attributes: [],
            },
        }
    })
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
}

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let allDogs = await getAllDogs();
    if (name) {
        let dogName = await allDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ? res.status(200).send(dogName) : res.status(404).send('😬 Sorry, looks like we don´t have that dog breed 🤷‍♂️');
    } else {
        res.status(200).send(allDogs)
    }
});

router.get('/temperament', async (_req, res) => {
    let infoApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    let tempsRepeated = infoApi.data.map(el => el.temperament).toString();
    tempsRepeated = await tempsRepeated.split(',');
    const tempsConEspacio = await tempsRepeated.map(el => {
        if (el[0] == ' ') {
            return el.split('');
        }
        return el;
    });
    const tempsSinEspacio = await tempsConEspacio.map(el => {
        if (Array.isArray(el)) {
            el.shift();
            return el.join('');
        }
        return el;
    })

    await tempsSinEspacio.forEach(el => {
        if (el != '') {
            Temperament.findOrCreate({ //si no lo encuentra lo crea, sino no hace nada.
                where: {
                    name: el
                },
            });
        }
    });
    const allTemps = await Temperament.findAll(); //traigo todos los temperamentos
    res.status(200).send(allTemps);

});

router.post('/dogs', async (req, res) => {
    let {
        name,
        height,
        weight,
        life_span,
        image,
        temperament,
    } = req.body;
    let raceCreated = await Race.create({
        name,
        height,
        weight,
        life_span,
        image,
    });
    let temperamentDB = await Temperament.findAll({
        where: {
            name: temperament,
        }
    });
    console.log(temperamentDB);
    raceCreated.addTemperament(temperamentDB);
    res.status(200).send('🐕 Race created successfully 🐶')
});


module.exports = router;


/*
router.get("/temperament", async (req, res) => {
    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let temperaments = temperamentApi.data.map((ob) => ob.temperament).toString();
    temperaments = await temperaments.split(",");

    const tempToDb = temperaments.forEach((ob) => {
      Temperament.findOrCreate({ //si no lo encuentra lo crea, sino no hace nada.
        where: { name: ob },
      });
    });
    const allTemperaments = await Temperament.findAll(); //traigo todos los temperamentos
    res.send(allTemperaments);
  });
  */