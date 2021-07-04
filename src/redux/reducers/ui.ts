import { UiState } from 'redux/models'
import { UiActions } from '../types/ui.types'

const defaultState: UiState = {
  loading: false,
}

export function ui(state: UiState = defaultState, action: UiActions): UiState {
  switch (action.type) {
  case 'SET_LOADING':
    return { ...state, loading: action.payload.isLoading }

  default:
    return state
  }
}
