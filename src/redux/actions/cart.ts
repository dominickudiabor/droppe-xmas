import {
  ApprovalAndDiscardedList,
  DetailProductList,
  WishListStatusConfirmation,
} from 'types'
import {
  CartActions,
  EXECUTE_WISHLIST_ITEM_STATUS,
  FETCH_WISHLIST,
  LOAD_UI_WITH_FETCHED_WISHLIST,
  UPDATE_APPROVAL_AND_DISCARDED_LIST,
  UPDATE_WISHLIST_ITEM_APPROVAL_STATUS,
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

export function updateWishlistItemApprovalStatus(
  itemStatus: WishListStatusConfirmation
): CartActions {
  return {
    type: UPDATE_WISHLIST_ITEM_APPROVAL_STATUS,
    payload: itemStatus,
  }
}

export function updateApprovalAndDiscardedList(
  updatedList: ApprovalAndDiscardedList
): CartActions {
  return {
    type: UPDATE_APPROVAL_AND_DISCARDED_LIST,
    payload: updatedList,
  }
}
