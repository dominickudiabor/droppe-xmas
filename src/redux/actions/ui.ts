import { SET_LOADING } from 'redux/types/ui.types'

export const setLoading = (isLoading: boolean) => {
  return {
    type: SET_LOADING,
    payload: {
      isLoading,
    },
  }
}
