import Posts from "containers/Posts"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { asString } from "utils/query-utils"

const Page: NextPage = () => {
  const router = useRouter()
  const [owner, setOwner] = useState("")

  useEffect(() => {
    if (router.isReady) {
      const owner = router.query.owner
      if (!!owner) {
        setOwner(asString(owner))
      }
    }
  }, [router.isReady])

  if (!owner) return null

  return <Posts owner={owner} activeListItem={"profile"} />
}

export default Page
