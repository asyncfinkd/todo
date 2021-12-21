import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import SignInCopyrightModule from './signin-copyright'
import {
  SignInModuleFixture,
  TSignInModuleFixtures,
} from 'fixtures/modules/signin'
import { SignInSchema, TSignInProps } from 'schema/pages/signin'
import { useForm, get } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import env from 'environment/env.json'
import toast from 'react-hot-toast'

export default function SignInRightAreaModule() {
  const { register, handleSubmit, formState } = useForm<TSignInProps>({
    resolver: yupResolver(SignInSchema),
  })

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
            შესვლა
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit((data: TSignInProps) => {
              fetch(`${env.server_url}/api/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              })
                .then((res) => res.json())
                .then((response) => {
                  if (!response.success) {
                    toast.error('ელ.ფოსტა ან პაროლი არასწორია')
                  } else {
                    toast.success('თქვენ წარმატებით გაიარეთ ავტორიზაცია')
                  }
                })
            })}
            sx={{ mt: 1 }}
          >
            {SignInModuleFixture.map((item: TSignInModuleFixtures) => {
              const { id, type, label } = item

              return (
                <>
                  <TextField
                    margin="normal"
                    fullWidth
                    label={label}
                    type={type}
                    id={id}
                    autoComplete={id}
                    error={get(formState.errors, id)}
                    helperText={
                      get(formState.errors, id) && item.required.message
                    }
                    // @ts-ignore
                    {...register(id)}
                  />
                </>
              )
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
  )
}
