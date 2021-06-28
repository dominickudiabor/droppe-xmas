import { Home } from 'pages/Home'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'scss/main.scss'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  )
}
