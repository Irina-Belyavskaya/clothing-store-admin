import { createAsyncThunk } from "@reduxjs/toolkit";

//============== Repositories ===================
import repository from "../../../repository";

//============== Types ===================
import { CategoryDto } from "../types/category-dto.type";
import { CreateCategoryDto } from "../types/create-category-dto.type";

const headers = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const getCategories = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await repository.get("/categories", headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t get categories.");
    }
  }
);

export const getCategoryById = createAsyncThunk<
  CategoryDto,
  { categoryId: number }
>("category/getById", async ({ categoryId }, thunkAPI) => {
  try {
    const response = await repository.get(`/categories/${categoryId}`, headers);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Can`t get categories.");
  }
});

export const createCategory = createAsyncThunk<
  CategoryDto,
  { dto: CreateCategoryDto }
>("category/create", async ({ dto }, thinkAPI) => {
  try {
    const response = await repository.post("/categories", dto, headers);
    return response.data;
  } catch (e) {
    return thinkAPI.rejectWithValue("Can`t create category.");
  }
});

export const updateCategory = createAsyncThunk<
  CategoryDto,
  { categoryId: number; dto: CreateCategoryDto }
>("category/update", async ({ categoryId, dto }, thinkAPI) => {
  try {
    const response = await repository.put(`/categories/${categoryId}`, dto, headers);
    return response.data;
  } catch (e) {
    return thinkAPI.rejectWithValue("Can`t update category.");
  }
});

export const deleteCategory = createAsyncThunk<
  CategoryDto,
  { categoryId: number }
>("category/deleteCategory", async ({ categoryId }, thunkAPI) => {
  try {
    const response = await repository.delete(`/categories/${categoryId}`, headers);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Can`t get categories.");
  }
});
