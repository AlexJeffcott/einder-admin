import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {fakeAuth} from '../../utils/auth'

const Login = () => {
  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } }

  const login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from)
    })
  }

  return <button onClick={login}>Log in</button>
}

export default Login