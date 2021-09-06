import { GET_DOGS, GET_TEMPERAMENTS } from "../actions";

const initialState = {
    dogs : [],
    temperaments: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload // en mi estado dogs, que en un principio es un arreglo vacío, manda todo lo que te mande la acción get_dogs
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;