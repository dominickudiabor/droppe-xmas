import { combineReducers } from 'redux'
import ui from './ui'

const createRootReducer = () =>
  combineReducers({
    ui,
  })

export default createRootReducer
