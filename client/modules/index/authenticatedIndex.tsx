import Box from '@mui/material/Box'
import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export default function AuthenticatedIndex() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            boxShadow: 3,
            bgcolor: 'background.paper',
            m: 1,
            p: 1,
            width: 500,
            height: 500,
            borderRadius: '8px',
          }}
        >
          <List>
            <ListItem disablePadding sx={{ margin: '20px 0' }}>
              <ListItemButton
                sx={{
                  width: 400,
                  border: '1px solid lightgray',
                  borderRadius: '8px',
                  padding: 1.5,
                }}
              >
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ margin: '20px 0' }}>
              <ListItemButton
                sx={{
                  width: 400,
                  border: '1px solid lightgray',
                  borderRadius: '8px',
                  padding: 1.5,
                }}
              >
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ margin: '20px 0' }}>
              <ListItemButton
                sx={{
                  width: 400,
                  border: '1px solid lightgray',
                  borderRadius: '8px',
                  padding: 1.5,
                }}
              >
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ margin: '20px 0' }}>
              <ListItemButton
                sx={{
                  width: 400,
                  border: '1px solid lightgray',
                  borderRadius: '8px',
                  padding: 1.5,
                }}
              >
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  width: 400,
                  border: '1px solid lightgray',
                  borderRadius: '8px',
                  padding: 1.5,
                }}
              >
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  )
}
