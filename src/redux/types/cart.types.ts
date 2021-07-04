import { UpdatedListItems } from 'types'

export const FETCH_WISHLIST = 'FETCH_WISHLIST'
export const LOAD_UI_WITH_FETCHED_WISHLIST = 'LOAD_UI_WITH_FETCHED_WISHLIST'
export const UPDATE_WISHLIST_ITEM_APPROVAL_STATUS =
  'UPDATE_WISHLIST_ITEM_APPROVAL_STATUS,'
export const UPDATE_CONFIRMED_WISHLIST = 'UPDATE_CONFIRMED_WISHLIST'
export const UPDATE_DISCARDED_WISHLIST = 'UPDATE_DISCARDED_WISHLIST'
export const EXECUTE_WISHLIST_ITEM_STATUS = ' EXECUTE_WISHLIST_ITEM_STATUS'
export const UPDATE_APPROVAL_AND_DISCARDED_LIST =
  'UPDATE_APPROVAL_AND_DISCARDED_LIST'

export type FetchWishList = {
  type: typeof FETCH_WISHLIST
  payload: { id: number; name: string }
}

export type LoadUiWithFetchedWishlist = {
  type: typeof LOAD_UI_WITH_FETCHED_WISHLIST
  payload: {
    list: UpdatedListItems[]
    name: string
  }
}

export type ExecuteWishListItemStatus = {
  type: typeof EXECUTE_WISHLIST_ITEM_STATUS
  payload: {
    item: UpdatedListItems
    status: 'Confirmed' | 'Discarded'
    name: string
  }
}

export type WishlistItemStatus = {
  type: typeof UPDATE_WISHLIST_ITEM_APPROVAL_STATUS
  payload: {
    item: UpdatedListItems
    status: 'Confirmed' | 'Discarded'
    name: string
  }
}

export type UpdateApprovalAndDiscardedList = {
  type: typeof UPDATE_APPROVAL_AND_DISCARDED_LIST
  payload: {
    updatedApprovedList: UpdatedListItems[]
    updatedRejectedList: UpdatedListItems[]
  }
}

export type CartActions =
  | FetchWishList
  | LoadUiWithFetchedWishlist
  | WishlistItemStatus
  | ExecuteWishListItemStatus
  | UpdateApprovalAndDiscardedList
