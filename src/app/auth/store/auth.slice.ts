import {createSlice} from "@reduxjs/toolkit";
import { AuthState } from "../types/auth-state.type";
import {logOutUser, registerUser, signInUser} from "./auth.actions";
import Cookies from 'js-cookie';

const initialState: AuthState = {
    token: null,
    pending: {
        token: false
    },
    errors: {
        token: null
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // =========== Sign up ==================
            .addCase(registerUser.pending, (state) => {
                state.pending.token = true;
                state.errors.token = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.pending.token = false;
                state.token = payload;
                Cookies.set('access_token_admin', payload.access_token);
                Cookies.set('expired_at_admin', String(payload.expired_at));

            })
            .addCase(registerUser.rejected, (state, action: any & { payload: any }) => {
                state.pending.token = false;
                state.errors.token = action.payload.message;
            })
            // =========== Sign in ==================
            .addCase(signInUser.pending, (state) => {
                state.pending.token = true;
                state.errors.token = null;
            })
            .addCase(signInUser.fulfilled, (state, { payload }) => {
                state.pending.token = false;
                state.token = payload;
                Cookies.set('access_token_admin', payload.access_token);
                Cookies.set('expired_at_admin', String(payload.expired_at));
            })
            .addCase(signInUser.rejected, (state, action: any & { payload: any }) => {
                state.pending.token = false;
                state.errors.token = action.payload;
            })
            // =========== Log out ==================
            .addCase(logOutUser.pending, (state) => {
                state.pending.token = true;
                state.errors.token = null;
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.pending.token = false;
                state.token = null;
                Cookies.remove('access_token_admin');
                Cookies.remove('expired_at_admin');
            })
            .addCase(logOutUser.rejected, (state, action: any & { payload: any }) => {
                state.pending.token = false;
                state.errors.token = action.payload.message;
            })
    },
});

export default authSlice.reducer;