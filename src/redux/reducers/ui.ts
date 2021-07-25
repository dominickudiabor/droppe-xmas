import { UiState } from 'redux/models'
import { UiActions } from '../types/ui.types'

const defaultState: UiState = {
  loading: false,
  users: [],
}

export function ui(state: UiState = defaultState, action: UiActions): UiState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload.isLoading }

    case 'LOAD_USER_DATA':
      return { ...state, users: action.payload.users }

    default:
      return state
  }
}
