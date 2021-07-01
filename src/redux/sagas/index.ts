import { all } from 'redux-saga/effects'
import cartSagas from './cart'

export default function* rootSaga() {
  yield all([...cartSagas])
}
