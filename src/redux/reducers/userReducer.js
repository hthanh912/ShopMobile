import { getToken } from "../../utils"
import { USER_LOG_IN_SUCCESS, USER_LOG_IN_FAIL, USER_LOG_OUT, USER_LOG_IN } from "../actions/userAction"
import { getUser } from "../../api/user"

const initialState = {
    user: {
        favorites: [],
        cart: {
            orders: [],
        },
        ordered: [],
        firstName: 'a',
        lastName: 'b',
    },
    isLoggedIn: false,
    isFetchingUser: false,
}


export default (state = { ...initialState }, { type, payload }) => {
    switch (type) {

        case USER_LOG_IN:
            return {...state, isFetchingUser: true}
        
        case USER_LOG_IN_SUCCESS:
            return { ...state, user: payload, isLoggedIn: true, isFetchingUser: false }

        case USER_LOG_IN_FAIL:
            return { ...state, user: { ...initialState.user }, isLoggedIn: false, isFetchingUser: false  };

        case USER_LOG_OUT:
            return { ...state, user: { ...initialState.user }, isLoggedIn: false, isFetchingUser: false  };

        default:
            return state
    }
}
