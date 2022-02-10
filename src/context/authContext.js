import { createContext, useEffect, useReducer } from 'react';

const AuthContext = createContext();
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload};
        case 'LOGOUT':
            return {...state, user: null};
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true};
        default:
            return state;
    }
};
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    });
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
};
export {AuthContext, authReducer, AuthContextProvider};
