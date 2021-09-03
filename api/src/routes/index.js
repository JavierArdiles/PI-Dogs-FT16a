const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
// const RaceRouter = require('./race');
// const TempRouter = require('./temperament');

const { Race, Temperament } = require('../db');

const {YOUR_API_KEY} = process.env;
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
    const infoApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    const tempsRepeated = await infoApi.data.map(el => el.temperament);
    
    const allTemps = await tempsRepeated.map(el => {
        if(typeof(el) === 'string'){
            return el.split(', ')
        }
    });
    
    const temps = allTemps.map(el => {
        for(let i = 0; i < el.length; i++){
            return el[i];
        }
    });
    temps.forEach(el => {
        Temperament.findOrCreate({
            where: { name: el }
        })
    });
    const allTemperaments = await Temperament.findAll();
    
    
    // const allTemps = tempsRepeated.join();
    // const allSeparated = allTemps.split(',');
    // const each = allSeparated.map(el => {
    //     if(el[0] === ' '){
    //         el = el.split(' ');
    //         el.shift();
    //         el.flat();
    //         return el;
    //     }
    // })

    res.status(200).send(allTemperaments);
    // const temperamentsFiltered = [];
    // for(let i = 0; i < temperamentsRepeated.length; i++){
    //     if(!temperamentsFiltered.includes( temperamentsRepeated[i] )){
    //         temperamentsFiltered.push(temperamentsRepeated[i]);
    //     }
    // };
    // return temperamentsFiltered;
})

module.exports = router;
