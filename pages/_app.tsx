import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme, customTheme } from '../themes';


// extendemos a AppProps y le agregamos la propiedad de theme
interface Props extends AppProps {
  theme: string
}

export default function App({ Component, pageProps, theme }: Props) {

  // console.log({ theme })
  const currentTheme: Theme = theme === 'light'
    ? lightTheme
    : theme === 'dark'
      ? darkTheme
      : customTheme


  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>

  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const validTheme = ['light', 'dark', 'custom']
  const cookies = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
  console.log('GetInitialProps:', cookies)
  return {
    theme: validTheme.includes(cookies.theme) ? cookies.theme : 'dark',
  }
}
