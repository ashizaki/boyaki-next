import { GraphQLResult } from "@aws-amplify/api"
import { useAuthenticator } from "@aws-amplify/ui-react"
import { Stack } from "@mui/material"
import { CognitoUserSession } from "amazon-cognito-identity-js"
import { ListPostsQuery, ListPostsQueryVariables, OnUpdateSubscription } from "API"
import { API, graphqlOperation } from "aws-amplify"
import PostList from "components/PostList"
import Sidebar from "containers/Sidebar"
import { listPosts } from "graphql/queries"
import { onUpdate } from "graphql/subscriptions"
import React, { useEffect, useReducer, useState } from "react"
import { CONNECTION_STATE_CHANGE, ConnectionState } from "@aws-amplify/pubsub"
import { Hub } from "aws-amplify"

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

type OnUpdateSubscriptionData = {
  value: { data: OnUpdateSubscription }
}

type Props = {
  userId?: string
}

const Posts: React.FC<Props> = ({ userId }) => {
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
            owner: userId,
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
      const subscription = API.graphql(
        graphqlOperation(onUpdate, {}, session.getIdToken().getJwtToken()),
      )
      if ("subscribe" in subscription) {
        const subscribe = subscription.subscribe({
          next: (payload: OnUpdateSubscriptionData) => {
            console.log(payload)
            if (payload.value.data.onUpdate) {
              console.log("subscription fired")
              const post = payload.value.data.onUpdate
              if (!userId || userId === payload.value.data.onUpdate.owner) {
                dispatch({ type: SUBSCRIPTION, post: post })
              }
            }
          },
          error: (error) => {
            console.warn(error)
          },
        })

        console.log(subscribe)
        return () => subscribe.unsubscribe()
      }
    }
  }, [session])

  return (
    <Stack direction={"row"} sx={{ width: "100%", height: "100vh" }}>
      <Sidebar activeListItem="global-timeline" />
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
