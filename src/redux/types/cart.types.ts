import {
  DetailProductList,
  UpdatedListItems,
  WishListStatusConfirmation,
} from 'types'

export const FETCH_WISHLIST = 'FETCH_WISHLIST'
export const LOAD_UI_WITH_FETCHED_WISHLIST = 'LOAD_UI_WITH_FETCHED_WISHLIST'
export const WISHLIST_ITEM_STATUS = 'WISHLIST_ITEM_STATUS,'
export interface CartState {
  products: []
  wishLists: { [name: string]: UpdatedListItems[] }
  approved: UpdatedListItems[] | []
  discarded: UpdatedListItems[] | []
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

export type WishlistItemStatus = {
  type: typeof WISHLIST_ITEM_STATUS
  payload: {
    itemStatus: WishListStatusConfirmation
  }
}

export type CartActions =
  | FetchWishList
  | LoadUiWithFetchedWishlist
  | WishlistItemStatus
