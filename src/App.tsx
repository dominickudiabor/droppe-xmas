import axios from 'axios'
import Spinner from 'components/spinner'
import Cart from 'pages/Cart'
import CartList from 'pages/CartList'
import Checkout from 'pages/Checkout'
import Confirmation from 'pages/Confirmation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { AppState } from 'redux/models'
import 'scss/main.scss'

export default function App() {
  const { loading } = useSelector((state: AppState) => state.ui)

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
  useEffect(() => {})

  if (loading) {
    return <Spinner />
  }

  return (
    <Switch>
      <Route exact path="/" component={CartList} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/confirmation" component={Confirmation} />
      <Route path="/cart/:id" component={Cart} />
    </Switch>
  )
}
