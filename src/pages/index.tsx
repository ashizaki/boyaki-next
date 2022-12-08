import { Authenticator, translations } from "@aws-amplify/ui-react"
import { I18n } from "aws-amplify"
import Timeline from "containers/Timeline"
import { NextPage } from "next"

I18n.putVocabularies(translations)
I18n.setLanguage("ja")

const Page: NextPage = () => {
  return <Authenticator signUpAttributes={["email"]}>{({}) => <Timeline />}</Authenticator>
}

export default Page
