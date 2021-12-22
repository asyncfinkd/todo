/* eslint-disable react/jsx-key */
import React from 'react'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import {
  SignUpModuleFixture,
  TSignUpModuleFixtures,
} from 'fixtures/modules/signup'

export default function SignUpForm() {
  return (
    <>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {SignUpModuleFixture.map((item: TSignUpModuleFixtures) => {
            return (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id={item.id}
                  label={item.label}
                  autoComplete={item.id}
                  type={item.type}
                />
              </Grid>
            )
          })}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          რეგისტრაცია
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              გაქვთ უკვე ანგარიში? შესვლა
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
