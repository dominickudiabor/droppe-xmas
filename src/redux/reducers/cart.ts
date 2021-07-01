import {
  CartActions,
  CartState,
  LOAD_UI_WITH_FETCHED_WISHLIST,
} from 'redux/types/cart.types'

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
  case LOAD_UI_WITH_FETCHED_WISHLIST: {
    const { list, name } = action.payload.wishList
    return { ...state, wishLists: { ...state.wishLists, [name]: list } }
  }
  default:
    return { ...state }
  }
}
