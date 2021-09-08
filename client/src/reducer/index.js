import { GET_DOGS, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT, FILTER_BY_ORIGIN } from "../actions";

const initialState = {
    dogs : [],
    allDogs: [],// Esto lo voy a usar para los filtros. Para tener a todos los perros guardados siempre y no que me vayan cambiando los perros que tengo con cada filtro que haga.
    temperaments: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload, // en mi estado dogs, que en un principio es un arreglo vacío, manda todo lo que te mande la acción get_dogs
                allDogs: action.payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs; // Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
            const temperamentFiltered = action.payload === 'all' ? allDogs : allDogs.filter(el => {
                if(typeof(el.temperaments) === 'string') return el.temperaments.includes(action.payload);
                if(Array.isArray(el.temperaments)){
                    let temps = el.temperaments.map(el => el.name);
                    return temps.includes(action.payload);
                }
                return true;
            });
            return {
                ...state,
                dogs: temperamentFiltered
            }
        case FILTER_BY_ORIGIN:
            const all = state.allDogs;
            const originFiltered = action.payload === 'all' ? all : action.payload === 'created' ? all.filter(el => el.createdInDb) : all.filter(el => !el.createdInDb);
            return {
                ...state,
                dogs: originFiltered
            }
        default:
            return state;
    }
}

export default rootReducer;