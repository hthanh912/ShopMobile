import { getUser, editProfile, addToFavorite, addToBag, removeFromFavorite, requestToken, confirmOrder, logIn, editBagItem, removeBagItem } from "../../api/user";
import { getUserLogInSuccess, getUserLogInFail, getUserLogOut, getUserLogIn } from "../actions/userAction"
import { getToken, removeTokenAndRefreshToken, getEmail, getRefreshToken, storeToken, storeRefreshToken, storeEmail, storeIsLoggedIn } from "../../utils";
import { navigateReplace } from "../../navigation/root-navigation";
import { screenName } from "../../constants";

export const getRequestUser = () => {
    return async dispatch => {

        const token = await getToken();

        if (token) {

            try {

                dispatch(getUserLogIn());

                const resultUser = await getUser(token);
                if (resultUser.data) {
                    dispatch(getUserLogInSuccess(resultUser.data));
                } else {
                    dispatch(getUserLogInFail());
                }

            } catch (error) {

                console.log(error);

                const email = await getEmail();
                const refreshToken = await getRefreshToken();

                try {
                    const resultToken = await requestToken(email, refreshToken);
                    console.log(resultToken);
                    await storeToken(resultToken.data.token);
                    const resultUser = await getUser(resultToken.data.token);
                    console.log("resultUser", resultUser);

                    dispatch(getUserLogInSuccess(resultUser.data));
                } catch (error) {
                    dispatch(getUserLogInFail());

                }

            }

        }

    }
}

export const getRequestUserLogin = (email, password) => {
    return async dispatch => {

        try {

            dispatch(getUserLogIn());

            const result = await logIn(email, password);

            if (result.data) {

                const { token, refreshToken } = result.data;

                const user = await getUser(token);

                if (user.data) {
                    dispatch(getUserLogInSuccess(user.data));

                    await storeToken(token);
                    await storeRefreshToken(refreshToken);
                    await storeEmail(email);

                }

            }

        } catch (error) {
            console.log(error);
            dispatch(getUserLogInFail());

        }
    }
}

export const getRequestUserLogOut = () => {
    return async dispatch => {
        await removeTokenAndRefreshToken();
        //await storeIsLoggedIn(false);
        dispatch(getUserLogOut());
        console.log("User LogOut");
    }
}

// export const getRequestRefreshToken = () => {
//     return async dispatch => {

//         try {

//             const resultToken = await requestToken(email, refreshToken);

//             if (resultToken) {

//                 await storeToken(resultToken.data.token);
//                 await storeRefreshToken(resultToken.data.refreshToken);
//                 dispatch(getUserLogInSuccess(resultToken.data.token));
//             }

//         } catch {

//         }

//     }
// }

export const getRequestEditProfile = (data) => {
    return async dispatch => {
        try {
            const token = await getToken();
            await editProfile(token, data);
            dispatch(getRequestUser());

            console.log("Edit Profile");

        } catch (error) {
            console.log(error);
        }
    }
}

export const getRequestAddProductToFavorites = (productId) => {
    return async dispatch => {
        try {
            console.log("Thunk Add Product To Favorites");
            const token = await getToken();
            await addToFavorite(token, productId);
            dispatch(getRequestUser());
        } catch (error) {
            console.log(error);
        }
    }
}

export const getRequestRemoveProductFromFavorites = (productId) => {
    return async dispatch => {
        try {
            console.log("Thunk Remove Product From Favorites");
            const token = await getToken();
            await removeFromFavorite(token, productId);
            dispatch(getRequestUser());
        } catch (error) {
            console.log(error);
        }
    }
}

export const getRequestAddProductToBag = (productId, variantId, quantity) => {
    return async dispatch => {
        try {
            console.log("Thunk Add Product To Bag");
            const token = await getToken();
            await addToBag(token, productId, variantId, quantity);
            dispatch(getRequestUser());
        } catch (error) {
            console.log(error);
        }
    }
}


export const getRequestConfirmOrder = () => {
    return async dispatch => {
        try {
            console.log("Thunk Confirm Order");
            const token = await getToken();
            await confirmOrder(token);
            dispatch(getRequestUser());
        } catch (error) {
            console.log(error);
        }
    }
}


export const getRequestEditItemBag = (orderItemId, quantity) => {
    return async dispatch => {
        try {
            console.log("Thunk Edit Quantity");
            const token = await getToken();
            await editBagItem(token, orderItemId, quantity);
            dispatch(getRequestUser());

        } catch (error) {
            console.log(error);
        }

    }
}

export const getRequestRemoveItemBag = (orderItemId) => {
    return async dispatch => {
        try {
            console.log("Thunk Remove Item");
            const token = await getToken();
            await removeBagItem(token, orderItemId);
            dispatch(getRequestUser());

        } catch (error) {
            console.log(error);
        }

    }
}