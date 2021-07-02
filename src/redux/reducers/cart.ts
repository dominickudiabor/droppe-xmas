import {
  CartActions,
  CartState,
  LOAD_UI_WITH_FETCHED_WISHLIST,
  WISHLIST_ITEM_STATUS,
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
  case WISHLIST_ITEM_STATUS: {
    const { item, status, name } = action.payload.itemStatus
    const childSpecificList = state.wishLists[name]
    const itemToUpdate = childSpecificList.findIndex((a) => a.id === item.id)
    childSpecificList[itemToUpdate].confirmed = status
    return {
      ...state,
      wishLists: { ...state.wishLists, [name]: childSpecificList },
    }
  }
  default:
    return { ...state }
  }
}
