import moment from "moment"
import { useRouter } from "next/router"
import React from "react"

import {
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material"

export default function PostList({
  isLoading,
  posts,
  getAdditionalPosts,
  listHeaderTitle,
  listHeaderTitleButton,
}) {
  return (
    <div
      style={{
        width: "100%",
        wordBreak: "break-all",
        overflow: "scroll",
        borderRight: "1px solid #37444C",
        flexGrow: 1,
      }}
    >
      {isLoading ? (
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <CircularProgress size={25} />
        </div>
      ) : (
        <List disablePadding>
          <ListItem
            alignItems="flex-start"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1200,
              backgroundColor: "#15202B",
              borderBottom: "1px solid #37444C",
            }}
          >
            <Typography variant="h5" fontWeight="fontWeightBold">
              {listHeaderTitle}
              {listHeaderTitleButton && listHeaderTitleButton}
            </Typography>
          </ListItem>
          {posts.map((post) => (
            <span key={post.id}>
              <PostItem post={post} />
              <Divider component="li" />
            </span>
          ))}
          <ListItem alignItems="flex-start" sx={{ textAlign: "center" }} key="loadmore">
            <ListItemText
              primary={
                <Button variant="outlined" onClick={() => getAdditionalPosts()} fullWidth>
                  {" "}
                  Read More{" "}
                </Button>
              }
            />
          </ListItem>
        </List>
      )}
    </div>
  )
}

type Scale = "years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds"

function PostItem({ post }) {
  const now = moment()
  const router = useRouter()

  const calcTimestampDiff = (timestamp) => {
    const scales = ["years", "months", "weeks", "days", "hours", "minutes", "seconds"]
    for (let i = 0; i < scales.length; i++) {
      const scale = scales[i]
      const diff = moment(now).diff(timestamp * 1000, scale as Scale)
      if (diff > 0) return diff + scale.charAt(0)
    }

    return 0 + scales[scales.length - 1].charAt(0)
  }

  return (
    <ListItem alignItems="flex-start" key={post.id} sx={{ width: "100%" }}>
      <ListItemAvatar>
        <div style={{ cursor: "pointer" }} onClick={() => router.push("/" + post.owner)}>
          <Avatar alt={post.owner} src="/" />
        </div>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            {post.owner}
            <Typography color="textSecondary" display="inline">
              {" " + String.fromCharCode(183) + " " + calcTimestampDiff(post.timestamp)}
            </Typography>
          </React.Fragment>
        }
        secondary={<Typography color="textPrimary">{post.content}</Typography>}
      />
    </ListItem>
  )
}
