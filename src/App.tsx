import axios from 'axios'
import Spinner from 'components/Spinner'
import Cart from 'pages/Cart'
import Checkout from 'pages/Checkout'
import Summary from 'pages/Summary'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { fetchUserData } from 'redux/actions'
import { AppState } from 'redux/models'
import 'scss/main.scss'

export default function App() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: AppState) => state.ui)
  const HomePage = React.lazy(() => import('pages/Home'))

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/summary" component={Summary} />
      <Route path="/cart/:id" component={Cart} />
    </Switch>
  )
}
