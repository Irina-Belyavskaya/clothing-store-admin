import { useEffect, useState } from "react";
import { Box, FormHelperText, Grid, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

//============== Redux ===================
import { useRoleSelector } from "app/roles/store/roles.selectors";
import { useAppDispatch } from "../../hooks/redux";
import { getRoles } from "app/roles/store/roles.actions";
import { assignRoleOnUser, getUserById } from "./store/users.actions";
import { useUserSelector } from "./store/users.selectors";

//============== Types ===================
import { ModalFormRoleProps } from "types/props.type";
import { UserAssignRoleDto } from "./types/user-assign-role-dto.type";

//============== Enums ===================
import { UserRoleTypes } from "app/roles/enums/user-role-types.enum";

//============== Yup ===================
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUserRole } from "./users-schemas.yap";

//============== Components ===================
import ModalFormLayout from "components/form-modal-layout.component";
import ErrorAlert from "components/error-alert.component";

export default function ModalUserForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();

  const { roles } = useRoleSelector();
  const userReducer = useUserSelector();

  const [userFullName, setUserFullName] = useState<string>('user name');
  const [userEmail, setUserEmail] = useState<string>('user email');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaUserRole)
  });

  useEffect(() => {
    if (id) {
      const userId = String(id);
      dispatch(getUserById({ id: userId }));
      dispatch(getRoles());
    }
  }, [id]);

  useEffect(() => {
    if (userReducer.user) {
      setUserFullName(userReducer.user.fullName);
      setUserEmail(userReducer.user.email);
      setValue('role', userReducer.user.roleName)
    }
  }, [userReducer.user]);

  const handleSubmitUpdate = (data: FieldValues) => {
    const role = roles.find((role) => role.name === data.role)
    if (role) {
      const dto: UserAssignRoleDto = {
        name: data.role,
        type: role.type
      }
      const userId = String(id);
      dispatch(assignRoleOnUser({ id: userId, dto }))
        .then(({ meta }) => {
          if (meta.requestStatus !== 'rejected') {
            reset();
            handleClose();
          }
        })
    }
  }

  return (
    <ModalFormLayout
      formTitle={'UPDATE USER'}
      buttonTitle={'UPDATE'}
      handleSubmit={handleSubmit(handleSubmitUpdate)}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Grid container>
        <Typography variant="subtitle1" gutterBottom sx={{ width: '100%' }}>
          {userEmail}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ width: '100%' }}>
          {userFullName}
        </Typography>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <Controller
          name="role"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Select
                sx={{ width: '100%' }}
                error={errors.type ? true : false}
                value={value ? value : ''}
                onChange={onChange}
              >
                {roles.map((role) => (
                  role.type !== UserRoleTypes.SuperAdmin &&
                    <MenuItem
                      key={role.id}
                      value={role.name}
                    >
                      {role.name}
                    </MenuItem>
                ))}
              </Select>
              <FormHelperText
                sx={{ color: 'red' }}
              >
                {errors.role ? `${errors.role.message}` : ''}
              </FormHelperText>
            </>
          )}
        />
      </Box>
      { userReducer.errors.user && <ErrorAlert title="Error" text={userReducer.errors.user}/> }
    </ModalFormLayout>
  );
}
