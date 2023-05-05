import { createAsyncThunk } from "@reduxjs/toolkit";

//============== Repositories ===================
import repository from "../../../repository";

//============== Types ===================
import { CreateRoleDto } from "../types/create-role-dto.type";
import { RoleDto } from "../types/role-dto.type";

const headers = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const getRoles = createAsyncThunk(
  "roles/getAll",
  async (_, thunkAPI)  => {
    try {
      const response = await repository.get("/roles", headers);
      return response.data.sort((first: any, second: any) => first.id - second.id);
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t get roles.");
    }
  }
);

export const getRoleById = createAsyncThunk<RoleDto, {id: number} >(
  "roles/getById",
  async ({id}, thunkAPI) => {
    try {
      const response = await repository.get(`/roles/${id}`, headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t get role by id.");
    }
  }
);

export const addRole = createAsyncThunk<RoleDto, {dto: CreateRoleDto} >(
  "roles/addRole",
  async ({dto}, thunkAPI) => {
    try {
      const response = await repository.post("/roles", dto, headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t create roles.");
    }
  }
);

export const updateRole = createAsyncThunk<RoleDto, {id: number, dto: CreateRoleDto} >(
  "roles/updateRole",
  async ({id, dto}, thunkAPI) => {
    try {
      const response = await repository.put( `/roles/${id}`, dto, headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t update roles.");
    }
  }
);

export const deleteRole = createAsyncThunk<RoleDto, {id: number} >(
  "roles/deleteRole",
  async ({id}, thunkAPI) => {
    try {
      const response = await repository.delete( `/roles/${id}`, headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t delete role.");
    }
  }
);