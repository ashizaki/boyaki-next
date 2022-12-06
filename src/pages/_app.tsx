import "styles/globals.css"
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material"
import { Amplify } from "aws-amplify"
import { Authenticator } from "@aws-amplify/ui-react"
import type { AppProps } from "next/app"
import "@aws-amplify/ui-react/styles.css"

import config from "aws-config"

const theme = createTheme({
  palette: {
    mode: "dark" as PaletteMode,
    primary: {
      main: "#1EA1F2",
      contrastText: "#fff",
    },
    background: {
      default: "#15202B",
      paper: "#15202B",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
    divider: "#37444C",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Arial"].join(","),
  },
})

Amplify.configure(config)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Authenticator.Provider>
        <Component {...pageProps} />
      </Authenticator.Provider>
    </ThemeProvider>
  )
}
