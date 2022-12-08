import { useAuthenticator } from "@aws-amplify/ui-react"
import HomeIcon from "@mui/icons-material/Home"
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
import { CognitoUserSession } from "amazon-cognito-identity-js"
import { API, Auth, graphqlOperation } from "aws-amplify"
import { createPost } from "graphql/mutations"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

type Props = {
  activeListItem: string
}

const drawerWidth = 340
const MAX_POST_CONTENT_LENGTH = 140

const Sidebar: React.FC<Props> = ({ activeListItem }) => {
  const router = useRouter()
  const { user, signOut } = useAuthenticator((context) => [context.user])
  const [value, setValue] = useState("")
  const [isError, setIsError] = useState(false)
  const [helperText, setHelperText] = useState("")

  const [session, setSession] = useState<CognitoUserSession>(null)

  useEffect(() => {
    if (user) {
      user.getSession((error, session) => {
        if (error) {
          console.log(error)
        } else {
          setSession(session)
        }
      })
    }
  }, [user])

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
    if (!!session) {
      try {
        await API.graphql(
          graphqlOperation(
            createPost,
            {
              input: {
                content: value,
              },
            },
            session.getIdToken().getJwtToken(),
          ),
        )
        setValue("")
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ width: "100%" }}>
        <ListItem key="home">
          <ListItemButton
            selected={activeListItem === "Home"}
            onClick={() => {
              Auth.currentAuthenticatedUser().then((_user) => {
                router.push("/")
              })
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
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
              router.push("/profile")
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
              <Button variant="outlined" onClick={handleSignOut} fullWidth>
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
