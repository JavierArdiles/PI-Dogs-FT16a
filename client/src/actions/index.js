import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/dogs'); // axios por default hace axios.get entonces no hace falta ponerlo.
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data,
        })
    }
}