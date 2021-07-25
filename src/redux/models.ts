import {
  ChildSpecificProperties,
  CombinedCartTotals,
  UpdatedListItems,
  UserListProperties,
} from 'types'

export type AppState = {
  ui: UiState
  cart: CartState
}

export interface UiState {
  loading: boolean
  users: UserListProperties[]
}

export interface CartState {
  wishLists: ChildSpecificProperties
  approved: UpdatedListItems[]
  discarded: UpdatedListItems[]
  total: CombinedCartTotals
}
