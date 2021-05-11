import actionTypes from '../actionTypes';
import axios from 'axios';
export const setTestMessage = (message) => ({
    type: actionTypes.TEST_MESSAGE,
    payload: message
});


export const getMenus = () => {
    return dispatch => {
        axios.get('http://localhost:1337/menus').then(res => {
            if( res.status === 200 ){
                dispatch({ type: actionTypes.GET_MENUS, payload: res.data });
            } else {
                dispatch({ type: actionTypes.GET_MENUS, payload: [] });
            }
        });
    }
}

export const createMenu = (inputData) => {
    return dispatch => {
        axios.post('http://localhost:1337/menus', inputData).then(res => {
            if( res.status === 200 ) {
                dispatch({ type: actionTypes.CREATE_MENU, payload: true });
            } else {
                dispatch({ type: actionTypes.CREATE_MENU, payload: false }); 
            }
        })
    }
}

export const getMenu = (id) => {
    return dispatch => {
        axios.get(`http://localhost:1337/menus/${id}`).then(res => {
            if( res.status === 200 ) {
                dispatch({ type: actionTypes.GET_MENU, payload: res.data });
            } else {
                dispatch({ type: actionTypes.GET_MENU, payload: {} });
            }
        })
    }
}

export const deleteMenu = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:1337/menus/${id}`).then(res => {
            if( res.status === 200 ) {
                dispatch({ type: actionTypes.DELETE_MENU, payload: { isSuccess: true, isDelete: true }});
            } else {
                dispatch({ type: actionTypes.DELETE_MENU, payload: { isSuccess: false, isDelete: true }});
            }
        })
    }
}

export const updateMenu = (inputData) => {
    return dispatch => {
        axios.put(`http://localhost:1337/menus/${inputData.id}`, inputData).then(res => {
            if( res.status === 200 ) {
                dispatch({ type: actionTypes.UPDATE_MENU, payload: true });
            } else {
                dispatch({ type: actionTypes.UPDATE_MENU, payload: false });
            }
        })
    }
}

export const deleteMenuImage = (file) => {
    return dispatch => {
        axios.delete(`http://localhost:1337/upload/files/${file.id}`).then(res => {
            if(res.status === 200 ) {
                dispatch({ type: actionTypes.DELETE_MENU_IMAGE, payload: true });
            } else {
                dispatch({ type: actionTypes.DELETE_MENU_IMAGE, payload: false });
            }
        })
    }
}

export const storeInit = () => ({ type: actionTypes.STORE_INIT, payload: false });