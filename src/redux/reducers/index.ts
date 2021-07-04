import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { cart } from './cart'
import { ui } from './ui'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'ui'],
}

const createRootReducer = () =>
  combineReducers({
    ui,
    cart,
  })

const rootReducer = createRootReducer()

export default persistReducer(persistConfig, rootReducer)
