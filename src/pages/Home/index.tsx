import React, {FC, useState, useEffect} from 'react'
import 'normalize.css'
import '../../styles.css'
import { RectangularBtnPrimaryLargeArrow, CircularBtnPrimarySmallArrow, RectangularBtnSecondaryLargeArrow, Layout, Input } from '../../components'
import applyTheme from '../../utils/applyTheme'

const Home: FC = () => {
    const [theme, setTheme] = useState('default')

    useEffect(() => applyTheme(theme), [theme])

    return (
        <Layout
            header="CSS Tryout Header"
            firstCol={{
                title: 'Buttons',
                content: (
                    <>
                        <RectangularBtnPrimaryLargeArrow
                            handleOnClick={() => setTheme('light')}
                            text="set light theme"
                            name="Set light theme button"
                            trackingId="set_light"
                            cyId="set_light_theme"
                        />
                        <RectangularBtnSecondaryLargeArrow
                            handleOnClick={() => setTheme('dark')}
                            text="set dark theme"
                            name="Set dark theme button"
                            trackingId="set_dark"
                            cyId="set_dark_theme"
                        />
                        <CircularBtnPrimarySmallArrow
                            handleOnClick={() => setTheme('default')}
                            name="Set default theme button"
                            trackingId="set_default"
                            cyId="set_default_theme"
                        />
                    </>
                ),
            }}
            secondCol={{
                title: 'Input',
                content: <Input id="1" />,
            }}
        />
    )
}

export default Home