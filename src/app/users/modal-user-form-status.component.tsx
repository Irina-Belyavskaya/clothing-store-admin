import { useEffect, useState } from "react";
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";

//============== Redux ===================
import { useAppDispatch } from "../../hooks/redux";
import { getUserById, updateUserStatus } from "./store/users.actions";
import { useUserSelector } from "./store/users.selectors";

//============== Types ===================
import { ModalFormRoleProps } from "types/props.type";
import { UpdateUserStatusDto } from "./types/user-status-dto.type";

//============== Yup ===================
import { Controller, FieldValues, useForm } from "react-hook-form";
import { schemaUserSatus } from "./users-schemas.yap";
import { yupResolver } from "@hookform/resolvers/yup";

//============== Components ===================
import ModalFormLayout from "components/form-modal-layout.component";
import ErrorAlert from "components/error-alert.component";

export default function ModalStatusForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();
  const { user, errors } = useUserSelector();
  
  const [userEmail, setUserEmail] = useState<string>('user email');

  const {
    handleSubmit,
    control,
    reset,
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaUserSatus)
  });

  useEffect(() => {
    if (id) {
      const userId = String(id);
      dispatch(getUserById({ id: userId }));
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      setValue('status', user.status);
      setUserEmail(user.email);
    }
  }, [user]);

  const handleSubmitUpdateStatus = (data: FieldValues) => {
    const dto: UpdateUserStatusDto = {
      status: data.status
    }
    const userId = String(id);
    dispatch(updateUserStatus({ id: userId, dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          reset();
          handleClose();
        }
      })
  }

  return (
    <ModalFormLayout
      formTitle={'UPDATE USER STATUS'}
      buttonTitle={'SAVE'}
      handleSubmit={handleSubmit(handleSubmitUpdateStatus)}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Grid container>
        <Typography variant="subtitle1" gutterBottom sx={{ width: '100%' }}>
          {userEmail}
        </Typography>
      </Grid>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
        <Controller
          control={control}
          name={'status'}
          render={({ field: { onChange, value } }) =>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value === undefined ? true : value}
              onChange={onChange}
            >
              <FormControlLabel value={true} control={<Radio />} label="Active" />
              <FormControlLabel value={false} control={<Radio />} label="Inactive" />
            </RadioGroup>
          }
        />
      </FormControl>
      { errors.user && <ErrorAlert title="Error" text={errors.user}/> }
    </ModalFormLayout>
  );
}
