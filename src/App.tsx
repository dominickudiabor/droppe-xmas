import axios from 'axios'
import { Cart } from 'pages/Cart'
import { CartList } from 'pages/CartList'
import Checkout from 'pages/Checkout'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import 'scss/main.scss'

export default function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
  useEffect(() => {})

  return (
    <Switch>
      <Route exact path="/" component={CartList} />
      <Route exact path="/checkout" component={Checkout} />
      <Route path="/cart/:id" component={Cart} />
    </Switch>
  )
}
