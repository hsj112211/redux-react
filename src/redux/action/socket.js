import actionTypes from '../actionTypes';

export const setFromServerMessage = (message) => ({
    type: actionTypes.SERVER_MESSAGE,
    payload: message
});

export const setServiceResponseTime = (time) => ({
    type: actionTypes.SERVER_RESPONSE_TIME,
    payload: time
})