import AsyncStorage from '@react-native-async-storage/async-storage';
import { RES_URL } from '@env'

export const getToken = async () => {
    try {
        const result = await AsyncStorage.getItem('token');
        //console.log('token', result);
        return result;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getRefreshToken = async () => {
    try {
        const result = await AsyncStorage.getItem('refreshToken');
        console.log('refreshToken', result);
        return result;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const removeTokenAndRefreshToken = async () => {
    try {
        await AsyncStorage.removeItem('token', '');
        await AsyncStorage.removeItem('refreshToken', '');
        console.log("remove Token And RefreshToken", true);
    } catch (error) {
        console.log(e);
    }
}

export const storeToken = async (token) => {
    try {
        AsyncStorage.setItem('token', token);
    } catch (error) {
        console.log(error);
    }
}

export const storeEmail = async (email) => {
    try {
        await AsyncStorage.setItem('email', email);
    } catch (error) {
        console.log(error);
    }
}

export const storeRefreshToken = async (refreshToken) => {
    try {
        await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
        console.log(error);
    }
}

export const getEmail = async () => {
    try {
        const result = await AsyncStorage.getItem('email');
        console.log('stored email', result);
        return result;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getIsLargeCard = async () => {
    try {
        const result = await AsyncStorage.getItem('isLargeCard');
        return JSON.parse(result);
    } catch (e) {
        console.log(e);
    }
}

export const storeIsLargeCard = async (isLargeCard) => {
    try {
        await AsyncStorage.setItem('isLargeCard', JSON.stringify(isLargeCard));
    } catch (error) {
        console.log(error);
    }
}

export const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const arrageListProduct = (list) => {

    let arragedList = []
    for (i in list) {
        if (list[i].colors.length > 1) {
            if (arragedList.length % 2 === 0) {
                arragedList.push(list[i])
                arragedList.push({_id: randomKey(), name: null})
            } else {
                arragedList.splice(arragedList.length - 1, 0, list[i]);
                arragedList.splice(arragedList.length - 1, 0, {_id: randomKey(), name: null});
            }
        } else {
            arragedList.push(list[i])
        }
    }

    return arragedList;
}

export const randomKey = () => Math.random().toString(36).replace(/[^a-z]+/g, '');

export const getFullResUrl = (url) => RES_URL + url;

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
