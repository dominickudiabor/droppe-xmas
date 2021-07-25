import {
  FETCH_USER_DATA,
  LOAD_USER_DATA,
  SET_LOADING,
  UiActions,
} from 'redux/types/ui.types'
import { UserListProperties } from 'types'

export const setLoading = (isLoading: boolean): UiActions => {
  return {
    type: SET_LOADING,
    payload: {
      isLoading,
    },
  }
}

export const fetchUserData = (): UiActions => {
  return {
    type: FETCH_USER_DATA,
  }
}

export const loadUserData = (userList: UserListProperties[]): UiActions => {
  return {
    type: LOAD_USER_DATA,
    payload: {
      users: userList,
    },
  }
}
