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
    return { ...state, wishLists: { ...state.wishLists, [name]: list } }
  }
  case WISHLIST_ITEM_STATUS: {
    const { item, status, name } = action.payload
    const childSpecificList = state.wishLists[name]
    const itemToUpdate = childSpecificList.findIndex((a) => a.id === item.id)
    childSpecificList[itemToUpdate].confirmed = status

    //     if(status=== 'Confirmed'){
    //      const existingItem =  state.approved.findIndex(a => a.id === item.id)
    // if(!existingItem) return {...state,approved:[...state.approved,item]}
    //     }
    return {
      ...state,
      wishLists: { ...state.wishLists, [name]: childSpecificList },
    }
  }
  default:
    return { ...state }
  }
}
