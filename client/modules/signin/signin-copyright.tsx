import { Typography } from '@mui/material';
import React from 'react';

export default function SignInCopyrightModule(props: any) {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {'ყველა უფლება დაცულია © '} {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}
