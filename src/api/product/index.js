import axios from "axios";
import { API_URL } from '@env'



export const getProductsByQuery = (pageNumber, query) => {
    
    let queryString = '';

    for (const key in query) {
        queryString += `${key}=${query[key]}&`
    }

    queryString += `page=${pageNumber}&limit=10`

    return axios({
        method: 'GET',
        url: `${API_URL}/products?${queryString}`,
    });
}

export const getProductsBySearch = (pageNumber, query) => {
    
    return axios({
        method: 'GET',
        url: `${API_URL}/products/search?query=${query}&page=${pageNumber}&limit=10`,
    });
}

export const getRandomProduct = (limit, category, brand) => {
    let url = `${API_URL}/products/random?limit=${limit}`;

    if (category) url += `&category=${category}`;
    if (brand) url += `&brand=${brand}`;

    return axios({
        method: 'GET',
        url,
    })
}

export const getCollectionsByGender = (gender) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/products/collectionsbygender?gender=${gender}`,
    });
}

export const getCategoriesByParentId = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/categories/${id}`
    })
}

export const getProductsByCategory = (page, category) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/products/${category}?page=${page}&limit=10`,
    });
}

export const getProductsByCollection = (page, productCollection) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/products/collections/${productCollection}?page=${page}&limit=10`,
    });
}

export const getAllCategories = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/categories`,
    })
}

export const getProduct = (slug) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/products/${slug}`,
    })
}





