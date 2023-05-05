import {createAsyncThunk} from "@reduxjs/toolkit";
import repository from "../../../repository";
import { AuthDto } from "../types/auth-dto.type";
import { RegistrationDto } from "../types/registration-dto.type";
import { SignInDto } from "../types/sign-in-dto.type";

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const registerUser = createAsyncThunk<AuthDto, {dto: RegistrationDto}>(
    'auth/registration',
    async ({dto}, thunkAPI) => {
        try{
            const response = await repository.post("auth/registration",dto, headers);
            return response.data;

        }   catch (e) {
            return  thunkAPI.rejectWithValue('Can`t sing up.')
        }
    }
);

export const signInUser = createAsyncThunk<AuthDto, {dto: SignInDto}>(
    'auth/login',
    async ({dto}, thunkAPI) => {
        try{
            const response = await repository.post("auth/login",dto, headers);
            return response.data;

        }   catch (e) {
            return  thunkAPI.rejectWithValue('Can`t log in.');
        }
    }
);


export const logOutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try{
            const response = await repository.get("auth/logout", headers);
            return response.data;

        }   catch (e) {
            return  thunkAPI.rejectWithValue('Can`t log out.')
        }
    }
);