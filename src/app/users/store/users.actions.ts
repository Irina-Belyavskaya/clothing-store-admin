import { createAsyncThunk } from "@reduxjs/toolkit";

//============== Repositories ===================
import repository from "../../../repository";

//============== Types ===================
import { UserAssignRoleDto } from "../types/user-assign-role-dto.type";
import { UpdateUserStatusDto } from "../types/user-status-dto.type";
import { UserDto } from "../types/users-dto.type";

const headers = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const getUsers = createAsyncThunk(
  "users/getAll",
  async (_, thunkAPI)  => {
    try {
      const response = await repository.get("/users", headers);
      return response.data.sort((first: any, second: any) => first.email.localeCompare(second.email));
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t get users.");
    }
  }
);

export const getUserById = createAsyncThunk<UserDto, {id: string} >(
  "users/getById",
  async ({id}, thunkAPI) => {
    try {
      const response = await repository.get(`/users/${id}`, headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t get user by id.");
    }
  }
);

export const assignRoleOnUser = createAsyncThunk<UserDto, {id: string, dto: UserAssignRoleDto} >(
  "users/assingRoleOnUser",
  async ({id, dto}, thunkAPI) => {
    try {
      const response = await repository.put( `/users/assign/${id}`, dto, headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t assign role on user.");
    }
  }
);

export const updateUserStatus = createAsyncThunk<UserDto, {id: string, dto: UpdateUserStatusDto} >(
  "users/updateStatus",
  async ({id, dto}, thunkAPI) => {
    try {
      const response = await repository.put( `/users/status/${id}`, dto, headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t ban user.");
    }
  }
);