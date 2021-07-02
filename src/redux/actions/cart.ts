import {
  DetailProductList,
  UpdatedListItems,
  WishListStatusConfirmation,
} from 'types'
import {
  CartActions,
  EXECUTE_WISHLIST_ITEM_STATUS,
  FETCH_WISHLIST,
  LOAD_UI_WITH_FETCHED_WISHLIST,
  UPDATE_CONFIRMED_WISHLIST,
  UPDATE_DISCARDED_WISHLIST,
  WISHLIST_ITEM_STATUS,
} from '../types/cart.types'

export function fetchWishList(id: number, name: string): CartActions {
  return {
    type: FETCH_WISHLIST,
    payload: { id, name },
  }
}

export function loadUiWithFetchedWishList(
  wishList: DetailProductList
): CartActions {
  return {
    type: LOAD_UI_WITH_FETCHED_WISHLIST,
    payload: wishList,
  }
}

export function executeWishListItemStatus(
  itemStatus: WishListStatusConfirmation
): CartActions {
  return {
    type: EXECUTE_WISHLIST_ITEM_STATUS,
    payload: itemStatus,
  }
}

export function wishlistItemStatus(
  itemStatus: WishListStatusConfirmation
): CartActions {
  return {
    type: WISHLIST_ITEM_STATUS,
    payload: itemStatus,
  }
}

export function updateConfirmedWishList(newItem: UpdatedListItems) {
  return {
    type: UPDATE_CONFIRMED_WISHLIST,
    payload: newItem,
  }
}

export function updateDiscardedWishList(newItem: UpdatedListItems) {
  return {
    type: UPDATE_DISCARDED_WISHLIST,
    payload: newItem,
  }
}
