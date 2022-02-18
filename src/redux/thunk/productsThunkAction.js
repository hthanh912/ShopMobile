import {getAllCategories} from '../../api/product';
import {getCategories} from '../actions/productAction.js'

export const getRequestCategories = () => {
    return async dispatch => {
        try {
            const result = await getAllCategories();
            //console.log(result);
            dispatch(getCategories(result.data.categories));
        } catch (error) {
            console.log(error);
        }

    }
}