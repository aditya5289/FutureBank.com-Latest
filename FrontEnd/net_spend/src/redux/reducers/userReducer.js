const initialState = {
    currentUser: null,
    isLoading: false,
    error: null,
    accessToken: null,
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                currentUser: action.payload.user,
                accessToken: action.payload.accessToken,
                isLoading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return initialState;
        case 'REFRESH_REQUEST':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'REFRESH_SUCCESS':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                isLoading: false,
                error: null,
            };
        case 'REFRESH_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default userReducer;
