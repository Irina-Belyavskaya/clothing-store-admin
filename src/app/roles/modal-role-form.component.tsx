import { useEffect, useState } from "react";
import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";

//============== Redux ===================
import { useAppDispatch } from "../../hooks/redux";
import { addRole, getRoleById, updateRole } from "./store/roles.actions";
import { useRoleSelector } from "./store/roles.selectors";

//============== Types ===================
import { CreateRoleDto } from "./types/create-role-dto.type";
import { UserRoleTypes } from "./enums/user-role-types.enum";
import { UserPermissions } from "./enums/user-permissions.enum";
import { ModalFormRoleProps } from "types/props.type";

//============== Components ===================
import ModalFormLayout from "components/form-modal-layout.component";
import ErrorAlert from "components/error-alert.component";

//============== Yup ===================
import { Controller, FieldValues, useForm } from "react-hook-form";
import { schemaRole } from "./roles-schema.yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ModalRoleForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();
  const [formTitle, setFormTitle] = useState<string>('CREATE ROLE');
  const [buttonTitle, setButtonTitle] = useState<string>('CREATE');
  const roleReducer = useRoleSelector();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaRole)
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    if (id) {
      const roleId = Number(id);
      setFormTitle('UPDATE ROLE');
      setButtonTitle('UPDATE');
      dispatch(getRoleById({ id: roleId }));
    } else {
      setFormTitle('CREATE ROLE');
      setButtonTitle('CREATE');
      setValue('roleName', '');
      setValue('rolePermissions', []);
      setValue('roleType', UserRoleTypes.Client)
    }
  }, [id]);

  useEffect(() => {
    if (roleReducer.role) {
      setValue('roleName', roleReducer.role.name);
      setValue('roleType', roleReducer.role.type);
      setValue('rolePermissions', roleReducer.role.permissions);
    }
  }, [roleReducer.role]);

  const handleSubmitCreate = (data: FieldValues) => {
    const dto: CreateRoleDto = {
      name: data.roleName,
      type: data.roleType,
      permissions: data.rolePermissions
    };

    dispatch(addRole({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          reset();
          handleClose();
        }
      })
  }

  const handleSubmitUpdate = (data: FieldValues) => {

    const dto: CreateRoleDto = {
      name: data.roleName,
      type: data.roleType,
      permissions: data.rolePermissions
    };

    const roleId = Number(id);
    dispatch(updateRole({ id: roleId, dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          reset();
          handleClose();
        }
      })
  }

  return (
    <ModalFormLayout
      formTitle={formTitle}
      buttonTitle={buttonTitle}
      handleSubmit={id ? handleSubmit(handleSubmitUpdate) : handleSubmit(handleSubmitCreate)}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Controller
        name="roleName"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            helperText={errors.roleName ? `${errors.roleName.message}` : ''}
            margin="normal"
            fullWidth
            label="Role name"
            id="roleName"
            value={value ? value : ''}
            onChange={onChange}
            error={errors.roleName ? true : false}
          />
        )}
      />
      <Box sx={{ marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-role-type-label">Role type</InputLabel>
          <Controller
            name="roleType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <Select
                  sx={{ width: '100%' }}
                  labelId="select-role-type-label"
                  label="Role type"
                  error={errors.role ? true : false}
                  value={value ? value : ''}
                  onChange={onChange}
                >
                  {Object.values(UserRoleTypes).map((roleType) => (
                    roleType !== UserRoleTypes.SuperAdmin &&
                    <MenuItem
                      key={roleType}
                      value={roleType}
                    >
                      {roleType}
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
        </FormControl>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="select-permissions-label">Permissions</InputLabel>
          <Controller
            name="rolePermissions"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <Select
                  sx={{ width: '100%' }}
                  labelId="select-permissions-label"
                  label="Permissions"
                  multiple
                  error={errors.rolePermissions ? true : false}
                  value={value ? value : []}
                  onChange={onChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-permissions"
                      label="Permissions"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value: any) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {Object.values(UserPermissions).map((permission, index) => (
                    <MenuItem
                      key={permission}
                      value={permission}
                    >
                      {permission}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  sx={{ color: 'red' }}
                >
                  {errors.rolePermissions ? `${errors.rolePermissions.message}` : ''}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Box>
      { roleReducer.errors.role && <ErrorAlert title="Error" text={roleReducer.errors.role}/> } 
    </ModalFormLayout>
  );
}
