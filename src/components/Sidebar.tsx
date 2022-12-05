import PersonIcon from "@mui/icons-material/Person"
import PublicIcon from "@mui/icons-material/Public"
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import React, { useState } from "react"

type Props = {
  activeListItem: string
}

const drawerWidth = 340
const MAX_POST_CONTENT_LENGTH = 140

const Sidebar: React.FC<Props> = ({ activeListItem }) => {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [isError, setIsError] = useState(false)
  const [helperText, setHelperText] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    if (event.target.value.length > MAX_POST_CONTENT_LENGTH) {
      setIsError(true)
      setHelperText(`${MAX_POST_CONTENT_LENGTH - event.target.value.length}`)
    } else {
      setIsError(false)
      setHelperText("")
    }
  }

  const handlePost = async () => {
    setValue("")
  }

  const signOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: "relative",
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem key="global-timeline">
          <ListItemButton
            selected={activeListItem === "global-timeline"}
            onClick={() => {
              Auth.currentAuthenticatedUser().then((_user) => {
                router.push("/global-timeline")
              })
            }}
          >
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Global Timeline" />
          </ListItemButton>
        </ListItem>
        <ListItem key="profile">
          <ListItemButton
            selected={activeListItem === "profile"}
            onClick={() => {
              Auth.currentAuthenticatedUser().then((user) => {
                router.push("/" + user.username)
              })
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem key="post-input-field">
          <ListItemText
            primary={
              <TextField
                error={isError}
                helperText={helperText}
                id="post-input"
                label="Type your post!"
                multiline
                rows={8}
                variant="filled"
                value={value}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            }
          />
        </ListItem>
        <ListItem key="post-button">
          <ListItemText
            primary={
              <Button
                variant="contained"
                color="primary"
                disabled={isError}
                onClick={handlePost}
                fullWidth
              >
                Post
              </Button>
            }
          />
        </ListItem>
        <ListItem key="logout">
          <ListItemText
            primary={
              <Button variant="outlined" onClick={signOut} fullWidth>
                Logout
              </Button>
            }
          />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar
