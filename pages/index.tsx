import { Authenticator, translations } from "@aws-amplify/ui-react"
import { I18n } from "aws-amplify"
I18n.putVocabularies(translations)
I18n.setLanguage("ja")

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  )
}
