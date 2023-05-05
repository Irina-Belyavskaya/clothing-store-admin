import { createSlice } from "@reduxjs/toolkit";

//============== Types ===================
import { UsersState } from "../types/user-state.type";

//============== Actions ===================
import { getUsers, getUserById, assignRoleOnUser, updateUserStatus} from "./users.actions";

const initialState: UsersState = {
  users: [],
  user: null,
  pending: {
    users: false,
    user: false,
  },
  errors: {
    users: null,
    user: null,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ================ Get users ===============
      .addCase(getUsers.pending, (state) => {
        state.pending.users = true;
        state.errors.users = null;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.pending.users = false;
        state.users = payload;
      })
      .addCase(getUsers.rejected, (state, action: any & { payload: any }) => {
        state.pending.users = false;
        state.errors.users = action.payload;
      })
      // ================ Get user by id ===============
      .addCase(getUserById.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.pending.user = false;
        state.user = payload;
      })
      .addCase(getUserById.rejected, (state, action: any & { payload: any }) => {
        state.pending.user = false;
        state.errors.user = action.payload;
      })
      // ================ Update user ===============
      .addCase(assignRoleOnUser.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(assignRoleOnUser.fulfilled, (state, { payload }) => {
        state.pending.user = false;
        state.user = payload;
      })
      .addCase(assignRoleOnUser.rejected, (state, action: any & { payload: any }) => {
        state.pending.user = false;
        state.errors.user = action.payload;
      })
      // ================ Ban user ===============
      .addCase(updateUserStatus.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, { payload }) => {
        state.pending.user = false;
        state.user = payload;
      })
      .addCase(updateUserStatus.rejected, (state, action: any & { payload: any }) => {
        state.pending.user = false;
        state.errors.user = action.payload;
      })
  },
});

export default usersSlice.reducer;
