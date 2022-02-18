export const getUserSelector = state => state.userReducer.user;
export const getIsFetchingUserSelector = state => state.userReducer.isFetchingUser;
export const getIsLoggedInSelector = state => state.userReducer.isLoggedIn;

export const getCategoriesSelector = state => state.productReducer.categories;

export const getVisibleFilterSelector = state => state.userReducer.visibleFilter;

export const getListFavoriteSelector = state => state.userReducer.user.favorites;
export const getListCartSelector = state => state.userReducer.user.cart;
export const getCartTotal = state => state.userReducer.user.cart.total;



