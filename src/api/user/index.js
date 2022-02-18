import axios from "axios";
import { getToken } from '../../utils';
import { API_URL } from '@env';



export const logIn = (email, password) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/user/login`,
        data: {
            email,
            password,
        }
    });
}

export const facebookLogin = (fbToken) => {
    console.log(fbToken);
    return axios({
        method: 'POST',
        url: `${API_URL}/user/facebookLogin`,
        headers: {
            'access_token': fbToken
        }
    })
} 

export const requestToken = (email, refreshToken) => {
    console.log("refresh token ");
    return axios({
        method: 'POST',
        url: `${API_URL}/user/token`,
        data: {
            email,
            refreshToken,
        },
    })
}

export const getUser = token => {
    console.log("getProfile ", token)
    return axios({
        method: 'GET',
        url: `${API_URL}/user/me`,
        headers: {
            'token': token
        }
    })
}

export const editProfile = (token, data) => {
    console.log("editProfile ");
    return axios({
        method: 'PATCH',
        url: `${API_URL}/user/me`,
        data: data,
        headers: {
            'token': token
        }
    })
}

export const signUp = (data) => {
    console.log("sign up ");
    return axios({
        method: 'POST',
        url: `${API_URL}/user/signup`,
        data: data,
    })
}

export const addToFavorite = (token, productId) => {
    console.log("add product to favorite");
    return axios({
        method: 'POST',
        url: `${API_URL}/user/me/favorites`,
        headers: {
            'token': token
        },
        data: {
            productId,
        }

    })
}

export const removeFromFavorite = (token, productId) => {
    console.log("remove product from favorite");
    return axios({
        method: 'DELETE',
        url: `${API_URL}/user/me/favorites`,
        headers: {
            'token': token
        },
        data: {
            productId,
        }
    })
}

export const addToBag = (token, productId, variantId, quantity) => {
    console.log("add product to bag");
    return axios({
        method: 'POST',
        url: `${API_URL}/user/me/cart`,
        headers: {
            'token': token
        },
        data: {
            productId,
            variantId,
            quantity,
        }
    })
}

export const editBagItem = (token, orderItemId, quantity) => {
    return axios({
        method: 'PATCH',
        url: `${API_URL}/user/me/cart`,
        headers: {
            'token': token
        },
        data: {
            orderItemId,
            quantity,
        }
    })
}

export const removeBagItem = (token, orderItemId) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/user/me/cart`,
        headers: {
            'token': token
        },
        data: {
            orderItemId,
        }
    })
} 

export const confirmOrder = (token) => {
    console.log("confirm order");
    return axios({
        method: 'POST',
        url: `${API_URL}/user/me/order`,
        headers: {
            'token': token
        },
    })
}

export const getOrdered = async () => {
    console.log('Get Ordered');
    const token = await getToken();
    return axios({
        method: 'GET',
        url: `${API_URL}/user/me/ordered`,
        headers: {
            'token': token
        },
    });
}
