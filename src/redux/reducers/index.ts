import { combineReducers } from 'redux'
import { cart } from './cart'
import { ui } from './ui'

const createRootReducer = () =>
  combineReducers({
    ui,
    cart,
  })

export default createRootReducer
