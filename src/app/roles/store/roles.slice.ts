import { createSlice } from "@reduxjs/toolkit";

//============== Types ===================
import { RoleState } from "../types/role-state.type";

//============== Actions ===================
import { addRole, getRoles, getRoleById, updateRole, deleteRole } from "./roles.actions";

const initialState: RoleState = {
  roles: [],
  role: null,
  pending: {
    roles: false,
    role: false,
  },
  errors: {
    roles: null,
    role: null,
  },
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ================ Get roles ===============
      .addCase(getRoles.pending, (state) => {
        state.pending.roles = true;
        state.errors.roles = null;
      })
      .addCase(getRoles.fulfilled, (state, { payload }) => {
        state.pending.roles = false;
        state.roles = payload;
      })
      .addCase(getRoles.rejected, (state, action: any & { payload: any }) => {
        state.pending.roles = false;
        state.errors.roles = action.payload;
      })
      // ================ Get role by id ===============
      .addCase(getRoleById.pending, (state) => {
        state.pending.role = true;
        state.errors.role = null;
      })
      .addCase(getRoleById.fulfilled, (state, { payload }) => {
        state.pending.role = false;
        state.role = payload;
      })
      .addCase(getRoleById.rejected, (state, action: any & { payload: any }) => {
        state.pending.role = false;
        state.errors.role = action.payload;
      })
      // ================ Add roles ===============
      .addCase(addRole.pending, (state) => {
        state.pending.role = true;
        state.errors.role = null;
      })
      .addCase(addRole.fulfilled, (state, { payload }) => {
        state.pending.role = false;
        state.role = payload;
      })
      .addCase(addRole.rejected, (state, action: any & { payload: any }) => {
        state.pending.role = false;
        state.errors.role = action.payload;
      })
      // ================ Update role ===============
      .addCase(updateRole.pending, (state) => {
        state.pending.role = true;
        state.errors.role = null;
      })
      .addCase(updateRole.fulfilled, (state, { payload }) => {
        state.pending.role = false;
        state.role = payload;
      })
      .addCase(updateRole.rejected, (state, action: any & { payload: any }) => {
        state.pending.role = false;
        state.errors.role = action.payload;
      })
      // ================ Delete role ===============
      .addCase(deleteRole.pending, (state) => {
        state.pending.role = true;
        state.errors.role = null;
      })
      .addCase(deleteRole.fulfilled, (state, { payload }) => {
        state.pending.role = false;
        state.role = payload;
      })
      .addCase(deleteRole.rejected, (state, action: any & { payload: any }) => {
        state.pending.role = false;
        state.errors.role = action.payload;
      })
  },
});

export default rolesSlice.reducer;
