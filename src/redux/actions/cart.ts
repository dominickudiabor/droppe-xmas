import {
  DetailProductList,
  WishListStatusConfirmation,
  WishListUpdateStatus,
} from 'types'
import {
  CartActions,
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
    payload: { wishList },
  }
}

export function wishlistItemStatus(
  itemStatus: WishListStatusConfirmation
): CartActions {
  return {
    type: WISHLIST_ITEM_STATUS,
    payload: {
      itemStatus,
    },
  }
}

export function updateConfirmedWishList(
  updateParameters: WishListUpdateStatus
) {
  return {
    type: UPDATE_CONFIRMED_WISHLIST,
    payload: {
      updateParameters,
    },
  }
}

export function updateDiscardedWishList(
  updateParameters: WishListUpdateStatus
) {
  return {
    type: UPDATE_DISCARDED_WISHLIST,
    payload: {
      updateParameters,
    },
  }
}
