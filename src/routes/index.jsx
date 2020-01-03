import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom"
import {fakeAuth} from '../utils/auth'
import { Home, Login } from '../pages'

const Routes = () => {
  return (
    <Router>
      <div>
        <AuthButton />

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  )
}

const AuthButton = () => {
  let history = useHistory()

  return fakeAuth.isAuthenticated ? (
      <button
        onClick={() => {
          fakeAuth.logout(() => history.push("/"))
        }}
      >
        Log out
      </button>
  ) : <div/>
}

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      fakeAuth.isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      )
    }
  />
)

export default Routes
