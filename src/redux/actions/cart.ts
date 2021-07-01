import {
  CartActions,
  DetailProductList,
  FETCH_WISHLIST,
  LOAD_UI_WITH_FETCHED_WISHLIST,
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
