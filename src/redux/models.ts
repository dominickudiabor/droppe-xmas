import { CartState } from './types/cart.types'
import { UiState } from './types/ui.types'

export type AppState = {
  ui: UiState
  cart: CartState
}
