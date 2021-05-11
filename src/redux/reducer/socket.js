import actionTypes from '../actionTypes';

const initialState = {
    fromServerMessage: [],
    serverResponseTime: "",
}

export default (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SERVER_MESSAGE:
            return { ...state, fromServerMessage: action.payload }
        
        case actionTypes.SERVER_RESPONSE_TIME:
            return { ...state, serverResponseTime: action.payload }

        default:
            return state
    }
}