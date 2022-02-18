import { GET_CATEGORIES } from '../actions/productAction.js'


const initialState = {
    categories: [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_CATEGORIES:
            return { ...state, categories: payload }

        default:
            return state
    }
}
