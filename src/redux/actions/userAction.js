
export const USER_LOG_IN = 'USER_LOG_IN';
export const USER_LOG_IN_SUCCESS = 'USER_LOG_IN_SUCCESS';
export const USER_LOG_IN_FAIL = 'USER_LOG_IN_FAIL';
export const USER_LOG_OUT = 'USER_LOG_OUT';

export const GET_USER_EDIT_PROFILE = 'GET_USER_EDIT_PROFILE';
export const GET_USER_ADD_PRODUCT_TO_FAVORITE = 'GET_USER_ADD_PRODUCT_TO_FAVORITE';
export const GET_LIST_FAVORITE = 'GET_LIST_FAVORITE';


export const getUserLogIn = () => ({
    type: USER_LOG_IN,
})

export const getUserLogInSuccess = user => ({
    type: USER_LOG_IN_SUCCESS,
    payload: user,
})

export const getUserLogInFail = () => ({
    type: USER_LOG_IN_FAIL,
})

export const getUserLogOut = () => ({
    type: USER_LOG_OUT,
})

export const getListFavorites = listFavorite => ({
    type: GET_LIST_FAVORITE,
    payload: listFavorite,
})

// export const getUserAddProductToFavorite = (token, listFavorites) => ({
//     type: GET_USER_ADD_PRODUCT_TO_FAVORITE,
//     payload: listFavorites,
// })

