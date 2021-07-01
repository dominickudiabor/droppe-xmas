import { DetailProductList, UpdatedListItems } from 'types'

export const FETCH_WISHLIST = 'FETCH_WISHLIST'
export const LOAD_UI_WITH_FETCHED_WISHLIST = 'LOAD_UI_WITH_FETCHED_WISHLIST'

export interface CartState {
  products: []
  wishLists: { [name: string]: UpdatedListItems[] }
  approved: []
  discarded: []
}

export type FetchWishList = {
  type: typeof FETCH_WISHLIST
  payload: { id: number; name: string }
}

export type LoadUiWithFetchedWishlist = {
  type: typeof LOAD_UI_WITH_FETCHED_WISHLIST
  payload: {
    wishList: DetailProductList
  }
}

export type CartActions = FetchWishList | LoadUiWithFetchedWishlist
