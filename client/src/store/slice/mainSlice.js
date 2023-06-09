import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cards: [],
    payments: [],
    auth: {
        loggedIn: false,
        user: null,
        token: null,
        error: null,
        signUp: false,
    },
    buddies: {
        loading: false,
        success: false,
        error: null
    },
    changePassword: {
        loading: false,
        success: false,
        error: null
    },
    resetPassword: {
        loading: false,
        success: false,
        email: null,
        error: null
    },
}


export const mainSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        getCards: (state, data) => {
            state.cards = data.payload
        },
        getPayments: (state, data) => {
            state.payments = data.payload
        },
        loggedIn: (state, { payload }) => {
            state.auth = {
                ...state.auth,
                user: payload.user.response,
                loggedIn: true,
                error: null,
                token: payload.user.token
            }
        },
        getProfile: (state, { payload }) => {
            console.log('getProfile....', payload);
            state.auth = {
                ...state.auth,
                user: payload,
            }
        },
        socialLoggedIn: (state, { payload }) => {
            console.log('social Login', payload.user, payload.user.key);
            state.auth = {
                ...state.auth,
                user: payload.user,
                loggedIn: true,
                token: payload.user.key
            }
        },
        signedUp: (state, { payload }) => {
            state.auth = {
                ...state.auth,
                signUp: true,
                token: payload.token
            }
        },
        setAuthError: (state, { payload }) => {
            state.auth = {
                ...state.auth,
                error: payload,
            }
        },
        requestChangePassword: (state, { payload }) => {
            state.changePassword = {
                ...state.resetPassword, 
                loading: true, 
            }
        },
        passwordChanged: (state, { payload }) => {
            state.changePassword = {
                loading: false, 
                success: true, 
                error: null
            }
        },
        setChangePasswordError: (state, { payload }) => {
            state.changePassword = {
                ...state.auth,
                error: payload,
            }
        },
        requestResetPassword: (state, { payload }) => {
            state.resetPassword = {
                ...state.resetPassword, 
                loading: true, 
                email: payload,
            }
        },
        passwordReseted: (state, { payload }) => {
            state.resetPassword = {
                ...state.resetPassword,
                loading: false, 
                success: true, 
                error: null,
            }
        },
        setResetPasswordError: (state, { payload }) => {
            state.resetPassword = {
                ...state.auth,
                error: payload,
            }
        },
        logout: (state) => {
            state.auth = {
                ...initialState.auth,
            }
        }
    },
})

export const { getCards, getPayments, loggedIn, logout, getProfile, socialLoggedIn, signedUp, requestChangePassword, passwordChanged, requestResetPassword, passwordReseted, setAuthError, setChangePasswordError, setResetPasswordError } = mainSlice.actions

export default mainSlice.reducer;