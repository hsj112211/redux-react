import actionTypes from '../actionTypes';


const initialState = {
    name: '',
    price: 0,
    image_url: '',
    testMessage: "",
    menuList: [],
    menu: {},
    isSuccess: false,
    isDelete: false,
    isImageDeleteSuccess: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TEST_MESSAGE:
            return { ...state, testMessage: action.payload }
        
        case actionTypes.GET_MENUS:
            return { ...state, menuList: action.payload }
        
        case actionTypes.CREATE_MENU:
            return { ...state, isSuccess: action.payload }
        
        case actionTypes.GET_MENU:
            return { ...state, menu: action.payload }

        case actionTypes.DELETE_MENU:
            return { ...state, isSuccess: action.payload.isSuccess, isDelete: action.payload.isDelete }

        case actionTypes.UPDATE_MENU:
            return { ...state, isSuccess: action.payload }

        case actionTypes.DELETE_MENU_IMAGE:
            return { ...state, isImageDeleteSuccess: action.payload }

        case actionTypes.STORE_INIT:
            // 우선 init 시킬 대상이 isSuccess 하나여서 아래와 같이 사용
            return { ...state, isSuccess: action.payload }


        default:
            return state
    }
}