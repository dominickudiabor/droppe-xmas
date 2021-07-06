import axios from 'axios'
import Spinner from 'components/Spinner'
import Cart from 'pages/Cart'
import Checkout from 'pages/Checkout'
import Home from 'pages/Home'
import Summary from 'pages/Summary'
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
      <Route exact path="/" component={Home} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/summary" component={Summary} />
      <Route path="/cart/:id" component={Cart} />
    </Switch>
  )
}
