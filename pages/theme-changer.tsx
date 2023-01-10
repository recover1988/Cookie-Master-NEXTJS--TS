import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Layout } from '../components/layouts'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { GetServerSideProps } from 'next'
import Cookies from 'js-cookie'
import axios from 'axios'

interface Props {
    theme: string
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
    const [currentTheme, setCurrentTheme] = useState(theme)

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = event.target.value
        setCurrentTheme(selectedTheme)
        //localStore
        localStorage.setItem('theme', selectedTheme)
        //Cookie
        Cookies.set('theme', selectedTheme)
    }

    const onClick = async () => {
        const { data } = await axios.get('/api/hello')
    }

    useEffect(() => {
        console.log('LocalStorage:', localStorage.getItem('theme'))
        console.log('Cookies:', Cookies.get('theme'))
        // se puede guardar hasta 5mb de informacion en el LocalStorage
        // axios.post('/api/hello', localStorage.getItem('theme'))
    }, [])

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup
                            value={currentTheme}
                            onChange={onThemeChange}
                        >
                            <FormControlLabel value='light' control={<Radio />} label='Light' />
                            <FormControlLabel value='dark' control={<Radio />} label='Dark' />
                            <FormControlLabel value='custom' control={<Radio />} label='Custom' />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        onClick={onClick}
                    >
                        Solicitud
                    </Button>
                </CardContent>
            </Card>

        </Layout>
    )
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    // const {cookies} = req.cookies // next ya lo serializa y devuelve el objeto cookie con su key=value
    const { theme = 'light', name = 'No name' } = req.cookies
    // hay que validar o controlar la cookie para que no envie informacion que no necesitemos
    const validTheme = ['light', 'dark', 'custom']
    return {
        props: {
            theme: validTheme.includes(theme) ? theme : 'dark',
            name
        }
    }
}

export default ThemeChangerPage