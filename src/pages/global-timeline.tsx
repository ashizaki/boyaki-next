import { useAuthenticator } from "@aws-amplify/ui-react"
import Posts from "containers/Posts"
import { NextPage } from "next"

const Page: NextPage = () => {
  const { user } = useAuthenticator((context) => [context.user])

  if (!user) return null

  return <Posts activeListItem={"global-timeline"} />
}

export default Page
