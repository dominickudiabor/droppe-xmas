import { takeLatest } from 'redux-saga/effects'
import { ToggleDialogAction, TOGGLE_DIALOG } from '../types'

function* doSomethingWhenDialogOpen(action: ToggleDialogAction) {
  yield console.log(action)
}

export default [takeLatest(TOGGLE_DIALOG, doSomethingWhenDialogOpen)]
