const initialState = {
    dogs = []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_CHARACTERS':
            return {
                ...state,
                dogs: action.payload // en mi estado dogs, que en un principio es un arreglo vacío, manda todo lo que te mande la acción get_dogs
            }
    }
}

export default rootReducer;