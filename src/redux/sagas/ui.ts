import { call, put, takeLatest } from 'redux-saga/effects'
import { loadUserData, setLoading } from 'redux/actions'
import { FETCH_USER_DATA } from 'redux/types/ui.types'
import uiService from 'services/uiService'
import { UserListProperties } from 'types'

const uiSagas = [takeLatest(FETCH_USER_DATA, onAppRenderLoadUserData)]

export function* onAppRenderLoadUserData() {
  try {
    yield put(setLoading(true))
    const userList: UserListProperties[] = yield call(uiService.fetchUserList)
    const updatedUserList = userList.map(({ id, name }) => ({
      id,
      name,
    }))
    yield put(loadUserData(updatedUserList))
    yield put(setLoading(false))
  } catch (error) {}
}

export default uiSagas
