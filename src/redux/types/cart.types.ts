import {
  DetailProductList,
  UpdateCredentials,
  UpdatedListItems,
  WishListStatusConfirmation,
} from 'types'

export const FETCH_WISHLIST = 'FETCH_WISHLIST'
export const LOAD_UI_WITH_FETCHED_WISHLIST = 'LOAD_UI_WITH_FETCHED_WISHLIST'
export const WISHLIST_ITEM_STATUS = 'WISHLIST_ITEM_STATUS,'
export const UPDATE_CONFIRMED_WISHLIST = 'UPDATE_CONFIRMED_WISHLIST'
export const UPDATE_DISCARDED_WISHLIST = 'UPDATE_DISCARDED_WISHLIST'
export const EXECUTE_WISHLIST_ITEM_STATUS = ' EXECUTE_WISHLIST_ITEM_STATUS'

export interface CartState {
  products: []
  wishLists: {
    [name: string]: {
      properties: UpdatedListItems[]
      approved: UpdatedListItems[]
      discarded: UpdatedListItems[]
    }
  }
  approved: UpdatedListItems[]
  discarded: UpdatedListItems[]
}

export type FetchWishList = {
  type: typeof FETCH_WISHLIST
  payload: { id: number; name: string }
}

export type LoadUiWithFetchedWishlist = {
  type: typeof LOAD_UI_WITH_FETCHED_WISHLIST
  payload: DetailProductList
}

export type ExecuteWishListItemStatus = {
  type: typeof EXECUTE_WISHLIST_ITEM_STATUS
  payload: WishListStatusConfirmation
}

export type WishlistItemStatus = {
  type: typeof WISHLIST_ITEM_STATUS
  payload: WishListStatusConfirmation
}

export type UpdateConfirmedWishList = {
  type: typeof UPDATE_CONFIRMED_WISHLIST
  payload: UpdateCredentials
}

export type UpdateDiscardedWishList = {
  type: typeof UPDATE_DISCARDED_WISHLIST
  payload: UpdateCredentials
}

export type CartActions =
  | FetchWishList
  | LoadUiWithFetchedWishlist
  | WishlistItemStatus
  | UpdateDiscardedWishList
  | UpdateConfirmedWishList
  | ExecuteWishListItemStatus
