import { GraphQLResult } from "@aws-amplify/api"
import { CONNECTION_STATE_CHANGE, ConnectionState } from "@aws-amplify/pubsub"
import { useAuthenticator } from "@aws-amplify/ui-react"
import { Stack } from "@mui/material"
import { CognitoUserSession } from "amazon-cognito-identity-js"
import { ListPostsQuery, ListPostsQueryVariables, OnCreateSubscription } from "API"
import { API, graphqlOperation, Hub } from "aws-amplify"
import PostList from "components/PostList"
import Sidebar from "containers/Sidebar"
import { listPosts } from "graphql/queries"
import { onCreate } from "graphql/subscriptions"
import React, { useEffect, useReducer, useState } from "react"

const SUBSCRIPTION = "SUBSCRIPTION"
const INITIAL_QUERY = "INITIAL_QUERY"
const ADDITIONAL_QUERY = "ADDITIONAL_QUERY"

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.posts
    case ADDITIONAL_QUERY:
      return [...state, ...action.posts]
    case SUBSCRIPTION:
      return [action.post, ...state]
    default:
      return state
  }
}

type OnCreateSubscriptionData = {
  value: { data: OnCreateSubscription }
}

type Props = {
  owner?: string
  activeListItem: string
}

const Posts: React.FC<Props> = ({ owner, activeListItem }) => {
  const { user } = useAuthenticator((context) => [context.user])
  const [posts, dispatch] = useReducer(reducer, [])
  const [nextToken, setNextToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<CognitoUserSession>(null)

  useEffect(() => {
    Hub.listen("api", (data: any) => {
      const { payload } = data
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const connectionState = payload.data.connectionState as ConnectionState
        console.log(connectionState)
      }
    })
  }, [])

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

  const getPosts = async (type, nextToken = null) => {
    if (session) {
      const res = (await API.graphql(
        graphqlOperation(
          listPosts,
          {
            sortDirection: "DESC",
            owner: owner,
            limit: 20, //default = 10
            nextToken: nextToken,
          } as ListPostsQueryVariables,
          session.getIdToken().getJwtToken(),
        ),
      )) as GraphQLResult<ListPostsQuery>
      dispatch({ type: type, posts: res.data.listPosts.items })
      setNextToken(res.data.listPosts.nextToken)
      setIsLoading(false)
    }
  }

  const getAdditionalPosts = () => {
    if (nextToken === null) return //Reached the last page
    getPosts(ADDITIONAL_QUERY, nextToken)
  }

  useEffect(() => {
    if (!!session) {
      getPosts(INITIAL_QUERY)
      const onCreateHandler = API.graphql(
        graphqlOperation(
          onCreate,
          {
            owner: owner,
          },
          session.getIdToken().getJwtToken(),
        ),
      )
      if ("subscribe" in onCreateHandler) {
        const onCreate = onCreateHandler.subscribe({
          next: (payload: OnCreateSubscriptionData) => {
            if (payload.value.data.onCreate) {
              console.log("subscription fired")
              const post = payload.value.data.onCreate
              dispatch({ type: SUBSCRIPTION, post: post })
            }
          },
          error: (error) => {
            console.warn(error)
          },
        })
        return () => onCreate.unsubscribe()
      }
    }
  }, [session])

  return (
    <Stack direction={"row"} sx={{ width: "100%", height: "100vh" }}>
      <Sidebar activeListItem={activeListItem} />
      <Stack sx={{ flexGlow: 1, width: "100%" }}>
        <PostList
          isLoading={isLoading}
          posts={posts}
          getAdditionalPosts={getAdditionalPosts}
          listHeaderTitle={"Global Timeline"}
        />
      </Stack>
    </Stack>
  )
}

export default Posts
