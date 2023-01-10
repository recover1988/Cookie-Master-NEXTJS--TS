import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme, customTheme } from '../themes';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';


// extendemos a AppProps y le agregamos la propiedad de theme
interface Props extends AppProps {
  theme: string
}

export default function App({ Component, pageProps, theme = 'dark' }: Props) {

  // console.log({ theme })
  const [currentTheme, setCurrentTheme] = useState(lightTheme)


  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'

    const selectedTheme: Theme = cookieTheme === 'light'
      ? lightTheme
      : cookieTheme === 'dark'
        ? darkTheme
        : customTheme

    setCurrentTheme(selectedTheme)
  }, [])


  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>

  )
}

// App.getInitialProps = async (appContext: AppContext) => {
//   const validTheme = ['light', 'dark', 'custom']
//   const cookies = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
//   console.log('GetInitialProps:', cookies)
//   return {
//     theme: validTheme.includes(cookies.theme) ? cookies.theme : 'dark',
//   }
// }
