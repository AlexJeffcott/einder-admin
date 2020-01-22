import React, { FC, useEffect, useState } from 'react'
import applyTheme from '../../utils/applyTheme'
import { RectangularBtnPrimaryLargeArrow, CircularBtnPrimarySmallArrow, RectangularBtnSecondaryLargeArrow, Layout, Input } from '../../components'
import { Theme, HomePageProps } from './types'

const HomePage: FC<HomePageProps> = ({count, incrementHomePageCounter, decrementHomePageCounter, resetHomePageCounter}) => {
  const [theme, setTheme] = useState<Theme>('default')

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
            <RectangularBtnSecondaryLargeArrow
              handleOnClick={incrementHomePageCounter}
              text="increment"
              name="increment"
              trackingId="increment"
              cyId="increment"
            />
            <RectangularBtnSecondaryLargeArrow
              handleOnClick={decrementHomePageCounter}
              text="decrement"
              name="decrement"
              trackingId="decrement"
              cyId="decrement"
            />
            <RectangularBtnSecondaryLargeArrow
              handleOnClick={resetHomePageCounter}
              text="reset"
              name="reset"
              trackingId="reset"
              cyId="reset"
            />
            <CircularBtnPrimarySmallArrow
              handleOnClick={() => setTheme('default')}
              name="Set default theme button"
              trackingId="set_default"
              cyId="set_default_theme"
            />
            <h1>{count}</h1>
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

export default HomePage