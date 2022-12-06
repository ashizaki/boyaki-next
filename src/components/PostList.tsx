import { Post } from "API"
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

type Props = {
  isLoading: boolean
  posts: Post[]
  getAdditionalPosts: () => void
  listHeaderTitle: string
  listHeaderButton?: React.ReactNode
}

const PostList: React.FC<Props> = ({
  isLoading,
  posts,
  getAdditionalPosts,
  listHeaderTitle,
  listHeaderButton,
}) => {
  return (
    <div
      style={{
        width: "100%",
        wordBreak: "break-all",
        overflow: "scroll",
        borderRight: "1px solid #37444C",
        backgroundColor: "#15202B",
        flexGrow: 1,
      }}
    >
      {isLoading ? (
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <CircularProgress size={25} />
        </div>
      ) : (
        <List disablePadding sx={{ backgroundColor: "#15202B" }}>
          <ListItem
            alignItems="flex-start"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1200,
              backgroundColor: "#15202B",
              borderBottom: "1px solid #37444C",
            }}
            secondaryAction={listHeaderButton}
          >
            <Typography variant="h5" color={"textPrimary"} fontWeight="fontWeightBold">
              {listHeaderTitle}
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

type ItemProp = {
  post: Post
}

const PostItem: React.FC<ItemProp> = ({ post }) => {
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
        <div
          style={{ cursor: "pointer" }}
          onClick={() => router.push({ pathname: "/users", query: { owner: post.owner } })}
        >
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
        sx={{ color: "#fff" }}
      />
    </ListItem>
  )
}

export default PostList
