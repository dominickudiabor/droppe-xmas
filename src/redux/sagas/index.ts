import { all } from 'redux-saga/effects'
import cartSagas from './cart'
import uiSagas from './ui'

export default function* rootSaga() {
  yield all([...cartSagas, ...uiSagas])
}
