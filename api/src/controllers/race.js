const { v4: uuid } = require('uuid');

// GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
//
// GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
//:
const getRaces = (req, res, next) => {
    try {

    } catch(err) {
        next(err);
    }
}


// GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
//:
function getRaceById(){

}

function postRace(){

}

module.exports = {
    getRaces,
    getRaceById,
    postRace
}