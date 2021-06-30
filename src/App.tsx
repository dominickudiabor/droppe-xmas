import axios from 'axios'
import { Cart } from 'pages/Cart'
import { CartList } from 'pages/CartList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'scss/main.scss'

export default function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

  return (
    <Switch>
      <Route exact path="/" component={CartList} />
      <Route path="/cart/:id" component={Cart} />
    </Switch>
  )
}
