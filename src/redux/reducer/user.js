import actionTypes from '../actionTypes';

const initialState = {
    jwt: '',
    user: {},
    isAuth: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_AUTHENTICATE:
            return { ...state, jwt: action.payload.jwt, user: action.payload.user, isAuth: action.payload.isAuth }

        case actionTypes.LOGIN_CHECK:
            return { ...state, isAuth: action.payload};
        default:
            return state
    }
}