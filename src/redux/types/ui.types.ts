export const SET_LOADING = 'SET_LOADING'

export type SetLoading = {
  type: typeof SET_LOADING
  payload: {
    isLoading: boolean
  }
}

export type UiActions = SetLoading
