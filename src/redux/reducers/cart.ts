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
    const { list, name } = action.payload
    return {
      ...state,
      wishLists: {
        ...state.wishLists,
        [name]: { ...state.wishLists[name], properties: list },
      },
    }
  }
  case WISHLIST_ITEM_STATUS: {
    const { item, status, name } = action.payload
    const childSpecificList = state.wishLists[name].properties
    const itemToUpdate = childSpecificList.findIndex((a) => a.id === item.id)
    childSpecificList[itemToUpdate].confirmed = status
    const updatedApprovedItems = state.wishLists[name].properties.filter(
      (a) => a.confirmed === 'Confirmed'
    )
    const updatedDiscardedItems = state.wishLists[name].properties.filter(
      (a) => a.confirmed === 'Discarded'
    )

    return {
      ...state,
      wishLists: {
        ...state.wishLists,
        [name]: {
          ...state.wishLists[name],
          properties: [...childSpecificList],
          approved: [...updatedApprovedItems],
          discarded: [...updatedDiscardedItems],
        },
      },
      // approved: [
      //   ...state.wishLists[name].filter((a) => a.confirmed === 'Confirmed'),
      // ],
      // discarded: [
      //   ...state.wishLists[name].filter((a) => a.confirmed === 'Discarded'),
      // ],
    }
  }
  default:
    return { ...state }
  }
}
