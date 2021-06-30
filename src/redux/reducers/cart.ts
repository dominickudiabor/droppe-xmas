import { CartActions, CartState } from 'redux/types/cart.types'

const defaultState: CartState = {
  products: [],
  wishLists: {},
  approved: [],
  discarded: [],
}

export function cart(
  state: CartState = defaultState,
  action: CartActions
): CartState {
  switch (action.type) {
  default:
    return { ...state }
  }
}
