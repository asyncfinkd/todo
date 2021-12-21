import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import React, { useContext } from 'react'
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
import { SignInRequest } from 'features/signin'
import Router from 'next/router'
import decode from 'jwt-decode'
import { ApplicationContext } from 'context/application'

export default function SignInRightAreaModule() {
  const { register, handleSubmit, formState } = useForm<TSignInProps>({
    resolver: yupResolver(SignInSchema),
  })
  const { setAccess_Token } = useContext(ApplicationContext)

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
              SignInRequest({ data }).then((result: any) => {
                document.cookie = `token=${result.access_token};path=/`

                let decodedData: any = decode(result.access_token)

                setAccess_Token(decodedData)
                Router.push('/')
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
