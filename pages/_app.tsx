import "../styles/globals.css"
import { Amplify } from "aws-amplify"
import type { AppProps } from "next/app"
import "@aws-amplify/ui-react/styles.css"

import config from "aws-config"

Amplify.configure(config)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
