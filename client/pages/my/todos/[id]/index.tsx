import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Link from 'next/link'
import { GetServerSidePropsContext } from 'next'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'

export interface SimpleDialogProps {
  open: boolean
  // selectedValue: string
  onClose: (value: string | any) => void
  info: any
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose(!open)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open} sx={{ padding: 25 }}>
      {console.log(props.info)}
      <DialogTitle>აირჩიეთ სასურველი ოპერაცია</DialogTitle>
      <List sx={{ pt: 0 }}>
        {props.info.map((item: any) => {
          return (
            <>
              <ListItem sx={{ paddingLeft: 3 }} button key={item._id}>
                <ListItemText primary={item.text} />
              </ListItem>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Button
                  variant="contained"
                  sx={{ width: '90%', margin: '10px 0' }}
                  color="error"
                >
                  წაშლა
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: '90%', margin: '10px 0' }}
                  color="success"
                >
                  რედაქტირება
                </Button>
              </Box>
            </>
          )
        })}
      </List>
    </Dialog>
  )
}

const drawerWidth = 240

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

export default function MyTodosDetailPages(
  { data, onceData }: any,
  props: Props
) {
  const [info, setInfo] = useState(data)
  const [onceItem, setOnceItem] = useState(onceData)

  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
  }
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {info.map((text: any) => (
          <Link key={text._id} href={`/my/todos/${text._id}`} passHref>
            <ListItem button>
              <ListItemText primary={text.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Button
        variant="contained"
        sx={{
          width: '95%',
          margin: 'auto',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 44,
          marginTop: 1,
        }}
        onClick={() => setOpen(!open)}
      >
        მართვა
      </Button>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {onceItem.text}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Box>
      </Box>
      <div>
        <Typography variant="subtitle1" component="div">
          Selected:
        </Typography>
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
          Open simple dialog
        </Button>
        <SimpleDialog
          // selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          info={info}
        />
      </div>
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req } = ctx
  const { cookies } = req

  const request = await fetch(
    `${process.env.SERVER_URL}/api/get/personal/todo`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
    }
  )

  const detailTodoRequest = await fetch(
    `${process.env.SERVER_URL}/api/get/personal/todo/${ctx.query.id}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
    }
  )

  const response = await request.json()

  const detailTodoResponse = await detailTodoRequest.json()

  return { props: { data: response.item, onceData: detailTodoResponse.item } }
}