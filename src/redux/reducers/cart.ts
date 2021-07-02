import {
  CartActions,
  CartState,
  LOAD_UI_WITH_FETCHED_WISHLIST,
  UPDATE_CONFIRMED_WISHLIST,
  UPDATE_DISCARDED_WISHLIST,
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
    const { list, name } = action.payload
    return { ...state, wishLists: { ...state.wishLists, [name]: list } }
  }
  case WISHLIST_ITEM_STATUS: {
    const { item, status, name } = action.payload
    const childSpecificList = state.wishLists[name]
    const itemToUpdate = childSpecificList.findIndex((a) => a.id === item.id)
    childSpecificList[itemToUpdate].confirmed = status
    return {
      ...state,
      wishLists: { ...state.wishLists, [name]: childSpecificList },
    }
  }

  case UPDATE_CONFIRMED_WISHLIST: {
    const itemToBeAdded = action.payload
    const existingItem = state.approved.find(
      (a) => a.productId === itemToBeAdded.productId
    )
    if (!existingItem)
      return { ...state, approved: [...state.approved, itemToBeAdded] }

    return {
      ...state,
      approved: state.approved.map((wishItem) =>
        wishItem.productId === itemToBeAdded.productId
          ? { ...wishItem, quantity: wishItem.quantity + 1 }
          : wishItem
      ),
    }
  }

  case UPDATE_DISCARDED_WISHLIST: {
    return { ...state }
  }
  default:
    return { ...state }
  }
}
