import { GraphQLResult } from "@aws-amplify/api"
import { CONNECTION_STATE_CHANGE, ConnectionState } from "@aws-amplify/pubsub"
import { useAuthenticator } from "@aws-amplify/ui-react"
import { Stack } from "@mui/material"
import { CognitoUserSession } from "amazon-cognito-identity-js"
import {
  ListTimelinesQuery,
  ListTimelinesQueryVariables,
  OnCreateTimelineSubscription,
  Post,
} from "API"
import { API, graphqlOperation, Hub } from "aws-amplify"
import PostList from "components/PostList"
import Sidebar from "containers/Sidebar"
import { listTimelines } from "graphql/queries"
import { onCreateTimeline } from "graphql/subscriptions"
import React, { useEffect, useReducer, useState } from "react"

const SUBSCRIPTION = "SUBSCRIPTION"
const INITIAL_QUERY = "INITIAL_QUERY"
const ADDITIONAL_QUERY = "ADDITIONAL_QUERY"

type Action = {
  type: "SUBSCRIPTION" | "INITIAL_QUERY" | "ADDITIONAL_QUERY"
  posts: Post[]
}

const reducer = (state: Post[], action: Action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.posts
    case ADDITIONAL_QUERY:
      return [...state, ...action.posts]
    case SUBSCRIPTION:
      return [...action.posts, ...state]
    default:
      return state
  }
}

type OnCreateTimelineSubscriptionData = {
  value: { data: OnCreateTimelineSubscription }
}

type Props = {}

const Timeline: React.FC<Props> = ({}) => {
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
          listTimelines,
          {
            sortDirection: "DESC",
            limit: 20, //default = 10
            nextToken: nextToken,
          } as ListTimelinesQueryVariables,
          session.getIdToken().getJwtToken(),
        ),
      )) as GraphQLResult<ListTimelinesQuery>
      dispatch({ type: type, posts: res.data.listTimelines.items.map((item) => item.post) })
      setNextToken(res.data.listTimelines.nextToken)
      setIsLoading(false)
    }
  }

  const getAdditionalPosts = () => {
    if (nextToken === null) return //Reached the last page
    getPosts(ADDITIONAL_QUERY, nextToken)
  }

  useEffect(() => {
    if (!!session) {
      const init = async () => {
        getPosts(INITIAL_QUERY)
      }

      init()
      const onCreateTimelineHandler = API.graphql(
        graphqlOperation(
          onCreateTimeline,
          {
            userId: user.username,
          },
          session.getIdToken().getJwtToken(),
        ),
      )
      if ("subscribe" in onCreateTimelineHandler) {
        const onCreate = onCreateTimelineHandler.subscribe({
          next: (payload: OnCreateTimelineSubscriptionData) => {
            if (payload.value.data.onCreateTimeline) {
              console.log("subscription fired")
              const timeline = payload.value.data.onCreateTimeline
              dispatch({ type: SUBSCRIPTION, posts: [timeline.post] })
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
      <Sidebar activeListItem={"Home"} />
      <Stack sx={{ flexGlow: 1, width: "100%" }}>
        <PostList
          isLoading={isLoading}
          posts={posts}
          getAdditionalPosts={getAdditionalPosts}
          listHeaderTitle={"Home"}
        />
      </Stack>
    </Stack>
  )
}

export default Timeline
