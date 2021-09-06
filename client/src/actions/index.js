import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';

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