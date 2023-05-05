import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
  FormControlLabel, Checkbox
} from '@mui/material';
import { useEffect, useState } from "react";

// ============== Redux ==============
import { useAppDispatch } from "../../hooks/redux";
import { getUserInfo, updateUserInfo } from "./store/personal-info.actions";
import { useUserInfoSelector } from './store/personal-info.selectors';

// ============== Yup ==============
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaPersonalInfo } from './personal-info-schema.yap';

// ============== Types ==============
import { UpdateAdminInfoDtoType } from './types/update-admin-info-dto.type';

// ============== Componets ==============
import ErrorAlert from 'components/error-alert.component';
import Loading from 'components/loading.component';

const UserInfoForm = () => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(true);
  const [getUser, setGetUser] = useState(true);

  const userInfo = useUserInfoSelector();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaPersonalInfo),
    defaultValues: { firstname: '', lastname: '', phone: '', address: '' }
  });

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch, getUser])

  useEffect(() => {
    if (userInfo.userInfo) {
      setValue('firstname', userInfo.userInfo.firstName);
      setValue('lastname', userInfo.userInfo.lastName);
      setValue('phone', userInfo.userInfo.phone);
      setValue('address', userInfo.userInfo.address);
    }
  }, [userInfo.userInfo])

  const handleSubmitForm = (data: FieldValues) => {
    const dto: UpdateAdminInfoDtoType = {
      firstName: data.firstname,
      lastName: data.lastname,
      phone: data.phone,
      address: data.address
    };

    dispatch(updateUserInfo({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          setDisabled(true);
          reset();
          setGetUser(!getUser);
        }
      })
  }

  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <CssBaseline />
      {userInfo.pending.userInfo 
        ? 
          <Loading/> 
        : 
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                Your personal information
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(handleSubmitForm)}
                sx={{ mt: 1 }}
              >
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      helperText={errors.firstname ? `${errors.firstname.message}` : ''}
                      margin="normal"
                      fullWidth
                      id="firstname"
                      value={value}
                      disabled={disabled}
                      onChange={onChange}
                      error={errors.firstname ? true : false}
                    />
                  )}
                />
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      helperText={errors.lastname ? `${errors.lastname.message}` : ''}
                      margin="normal"
                      fullWidth
                      id="lastname"
                      value={value}
                      disabled={disabled}
                      onChange={onChange}
                      error={errors.lastname ? true : false}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      helperText={errors.phone ? `${errors.phone.message}` : ''}
                      margin="normal"
                      fullWidth
                      id="phone"
                      value={value}
                      disabled={disabled}
                      onChange={onChange}
                      error={errors.phone ? true : false}
                    />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      helperText={errors.address ? `${errors.address.message}` : ''}
                      margin="normal"
                      fullWidth
                      id="address"
                      value={value}
                      disabled={disabled}
                      onChange={onChange}
                      error={errors.address ? true : false}
                    />
                  )}
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={!disabled} />
                  }
                  label="Update info"
                  onChange={() => setDisabled(!disabled)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: '20px',
                    backgroundColor: '#0A5F38',
                    '&:hover': {
                      backgroundColor: '#0E8E53',
                      color: 'white',
                    }
                  }}
                >
                  Save
                </Button>
              </Box>
              { userInfo.errors.userInfo && <ErrorAlert title="Error" text={userInfo.errors.userInfo}/> }
            </Box>
          </Grid>
      }
    </Grid>
  )
}

export default UserInfoForm;