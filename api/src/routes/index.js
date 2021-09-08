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
            heightMin: el.height.metric.split(' - ')[0],
            heightMax: el.height.metric.split(' - ')[1],
            weightMin: el.weight.metric.split(' - ')[0] === 'NaN' ? '0' : el.weight.metric.split(' - ')[0],
            weightMax: el.weight.metric.split(' - ')[1],
            life_span: el.life_span,
            temperaments: el.temperament,
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

router.get('/dogs/:raceId', async (req, res) => {
    const { raceId } = req.params;
    const allRaces = await getAllDogs();
    if (raceId) {
        let race = await allRaces.filter(el => el.id == raceId);
        race.length ? res.status(200).json(race) : res.status(404).send(`Sorry, we don´t have a race with ${raceId} as ID 🤷‍♀️`);
    }
})

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
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        image,
        temperaments,
    } = req.body;
    let raceCreated = await Race.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span: life_span + ' years',
        image,
    });
    let temperamentDB = await Temperament.findAll({
        where: {
            name: temperaments,
        }
    });
    console.log(temperamentDB);
    raceCreated.addTemperament(temperamentDB);
    res.status(200).send('🐕 Race created successfully 🐶')
});


module.exports = router;

// todos los temperaments eran temperament