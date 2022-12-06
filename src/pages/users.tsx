import Posts from "containers/Posts"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const asString = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value[0]
  }
  return value
}

const Page: NextPage = () => {
  const router = useRouter()
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const userId = router.query.userId
    if (userId) {
      setUserId(asString(userId))
    }
  }, [router.isReady])

  if (!userId) return null

  return <Posts userId={userId} />
}

export default Page
