import { useNavigate } from "react-router-dom";
import { Grid, Avatar, Typography, Box, TextField, Button } from "@mui/material";

// ============== Yup ==============
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignIn } from "./auth-schemas.yap";
import { Controller, FieldValues, useForm } from "react-hook-form";

// ============== Redux ==============
import { useAppDispatch } from "hooks/redux";
import { signInUser } from "./store/auth.actions";
import { useAuthSelector } from "./store/auth.selectors";

// ============== Components ==============
import ErrorAlert from "components/error-alert.component";

// ============== Types ==============
import { SignInDto } from "./types/sign-in-dto.type";

// ============== Icons ==============
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { getUsers } from "app/users/store/users.actions";
import { useState } from "react";

export default function AuthSignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAuthSelector();
  const [forbiddenError, setForbiddenError] = useState('');
  const color = "#0A5F38";

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignIn),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmitForm = (data: FieldValues) => {
    setForbiddenError('');
    const dto: SignInDto = {
      email: data.email,
      password: data.password,
    };

    dispatch(signInUser({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== "rejected") {
          dispatch(getUsers())
            .then(({ meta }) => {
              if (meta.requestStatus !== "rejected") {
                reset();
                navigate("/", { replace: true });
              } else {
                setForbiddenError('Forbidden');
              }
            })
        }
      });
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        backgroundImage: `url(${'https://images.unsplash.com/photo-1485570661444-73b3f0ff9d2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1785&q=80'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid
        container
        sx={{
          my: 10,
          mx: 50,
          marginBottom: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: 'rgb(255,255,255,0.5)',
          borderRadius: 5,
          padding: 1
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: color,
            color: "black",
          }}
        >
          <LoginOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" >
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSubmitForm)}
          sx={{
            mt: 1
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                helperText={errors.email ? `${errors.email.message}` : ""}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                error={errors.email ? true : false}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                helperText={errors.password ? `${errors.password.message}` : ""}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                error={errors.password ? true : false}
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: "20px",
              color: "black",
              backgroundColor: color,
              "&:hover": {
                backgroundColor: "#0E8E53"
              }
            }}
          >
            Sign in
          </Button>
          {(auth.errors.token || forbiddenError) &&
            <ErrorAlert title="Error" text={auth.errors.token || forbiddenError} />
          }
        </Box>
      </Grid>
    </Grid>
  );
}