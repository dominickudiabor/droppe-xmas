import { all } from 'redux-saga/effects'
import uiSagas from './ui'

export default function* rootSaga() {
  yield all([...uiSagas])
}
