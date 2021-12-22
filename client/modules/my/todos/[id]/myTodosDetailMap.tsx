import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { EditRequest } from 'features/my/todos/[id]'
import TextField from '@mui/material/TextField'

export default function MyTodosDetailMap({ item }: any) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(item.text)
  return (
    <>
      <ListItem sx={{ paddingLeft: `${!edit && '3'}` }} button key={item._id}>
        {edit ? (
          <TextField
            sx={{ width: '100%' }}
            id="outlined-basic"
            label="შეიყვანეთ..."
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <ListItemText primary={item.text} />
        )}
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
          onClick={() => {
            setEdit(!edit)
            if (edit) {
              const data = {
                text: value,
              }
              const toID = item._id
              EditRequest({ data, toID }).then((result) => {
                console.log(result)
              })
            }
          }}
        >
          {edit ? 'შენახვა' : 'რედაქტირება'}
        </Button>
      </Box>
    </>
  )
}
