import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';

export function getDogs(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/dogs', {}); // axios por default hace axios.get entonces no hace falta ponerlo.
        return dispatch({
            type: GET_DOGS,
            payload: json.data,
        })
    }
};

export function getTemperaments(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/temperament', {});
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data,
        })
    }
}

export function filterDogsByTemperament(payload){
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function filterDogsByOrigin(payload){
    return {
        type: FILTER_BY_ORIGIN,
        payload,
    }
}

export function sortByName(payload){
    return {
        type: SORT_BY_NAME,
        payload,
    }
}

export function sortByWeight(payload){
    return {
        type: SORT_BY_WEIGHT,
        payload,
    }
}