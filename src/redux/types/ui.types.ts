import { UserListProperties } from 'types'

export const SET_LOADING = 'SET_LOADING'
export const FETCH_USER_DATA = 'FETCH_USER_DATA'
export const LOAD_USER_DATA = 'LOAD_USER_DATA'

export type SetLoading = {
  type: typeof SET_LOADING
  payload: {
    isLoading: boolean
  }
}

export type fetchUserData = {
  type: typeof FETCH_USER_DATA
}

export type LoadUserData = {
  type: typeof LOAD_USER_DATA
  payload: {
    users: UserListProperties[]
  }
}

export type UiActions = SetLoading | LoadUserData | fetchUserData
