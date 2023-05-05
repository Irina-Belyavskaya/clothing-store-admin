import { createAsyncThunk } from "@reduxjs/toolkit";

// ============== Repository ==============
import repository from "../../../repository";

// ============== Types ==============
import { UpdateAdminInfoDtoType } from "../types/update-admin-info-dto.type";

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const getUserInfo = createAsyncThunk(
    'user/info/get',
    async (_, thunkAPI) => {
        try {
            const response = await repository.get('/users/info/user', headers);
            return response.data;

        } catch (e) {
            return thunkAPI.rejectWithValue('Can`t get user info')
        }
    }
);


export const updateUserInfo = createAsyncThunk<UpdateAdminInfoDtoType, { dto: UpdateAdminInfoDtoType }>(
    'user/info/update',
    async ({ dto }, thunkAPI) => {
        try {
            const response = await repository.put('/users/info/user', dto, headers);
            return response.data;

        } catch (e) {
            return thunkAPI.rejectWithValue('Can`t update user info')
        }
    }
);

