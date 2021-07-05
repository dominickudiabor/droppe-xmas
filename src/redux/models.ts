import {
  ChildSpecificProperties,
  CombinedCartTotals,
  UpdatedListItems,
} from 'types'

export type AppState = {
  ui: UiState
  cart: CartState
}

export interface UiState {
  loading: boolean
}

export interface CartState {
  wishLists: ChildSpecificProperties
  approved: UpdatedListItems[]
  discarded: UpdatedListItems[]
  total: CombinedCartTotals
}
