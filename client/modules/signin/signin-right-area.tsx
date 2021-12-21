import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SignInCopyrightModule from './signin-copyright';
import {
  SignInModuleFixture,
  TSignInModuleFixtures,
} from 'fixtures/modules/signin';

export default function SignInRightAreaModule() {
  return (
    <>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            {SignInModuleFixture.map((item: TSignInModuleFixtures) => {
              return (
                <>
                  <TextField
                    margin="normal"
                    fullWidth
                    name={item.id}
                    label={item.label}
                    type={item.type}
                    id={item.id}
                    autoComplete={item.id}
                  />
                </>
              );
            })}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              შესვლა
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  დაგავიწყდა პაროლი?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'არ გაქვთ ანგარიში? დარეგისტრირდი'}
                </Link>
              </Grid>
            </Grid>
            <SignInCopyrightModule sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </>
  );
}
