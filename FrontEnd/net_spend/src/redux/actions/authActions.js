import { getCurrentUser as fetchCurrentUser, loginUser as fetchLoginUser, refreshToken as fetchRefreshToken, logoutUser as performLogout } from '../../Services/authService';

export const setLoading = () => ({
    type: 'LOGIN_REQUEST'
});

export const setCurrentUser = (user, accessToken) => ({
    type: 'LOGIN_SUCCESS',
    payload: { user, accessToken }
});

export const setError = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: { message: error.message, stack: error.stack }
});

export const login = (credentials) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const data = await fetchLoginUser(credentials);
        const currentUser = await fetchCurrentUser(); // Fetch user details after login
        dispatch(setCurrentUser(currentUser, data.token));
    } catch (error) {
        dispatch(setError(error));
    }
};

export const logout = () => (dispatch) => {
    performLogout();
    localStorage.clear(); // Clear all local storage items
    dispatch({ type: 'LOGOUT' });
};

export const refresh = () => async (dispatch) => {
    dispatch({ type: 'REFRESH_REQUEST' });
    try {
        const accessToken = await fetchRefreshToken();
        const currentUser = await fetchCurrentUser(); // Fetch user details after token refresh
        dispatch({ type: 'REFRESH_SUCCESS', payload: { user: currentUser, accessToken } });
    } catch (error) {
        dispatch({ type: 'REFRESH_FAILURE', payload: { message: error.message, stack: error.stack } });
    }
};
