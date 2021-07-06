import {
  ChildSpecificProperties,
  CombinedCartTotals,
  UpdatedListItems,
} from 'types'

export const FETCH_WISHLIST = 'FETCH_WISHLIST'
export const LOAD_UI_WITH_FETCHED_WISHLIST = 'LOAD_UI_WITH_FETCHED_WISHLIST'
export const UPDATE_WISHLIST_ITEM_APPROVAL_STATUS =
  'UPDATE_WISHLIST_ITEM_APPROVAL_STATUS,'
export const EXECUTE_WISHLIST_ITEM_STATUS = ' EXECUTE_WISHLIST_ITEM_STATUS'
export const UPDATE_APPROVAL_AND_DISCARDED_LIST =
  'UPDATE_APPROVAL_AND_DISCARDED_LIST'
export const PUSH_APPROVAL_LIST_TO_API = 'PUSH_APPROVAL_LIST_TO_API'
export const UPDATE_COMBINED_CART_TOTAL = 'UPDATE_COMBINED_CART_TOTAL'
export const CLEAR_CART_AFTER_COMPLETED_ORDER =
  'CLEAR_CART_AFTER_COMPLETED_ORDER'

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
    status: {
      item: UpdatedListItems
      status: 'Confirmed' | 'Discarded'
      name: string
    }
  }
}

export type WishlistItemStatus = {
  type: typeof UPDATE_WISHLIST_ITEM_APPROVAL_STATUS
  payload: {
    status: {
      item: UpdatedListItems
      status: 'Confirmed' | 'Discarded'
      name: string
    }
  }
}

export type UpdateApprovalAndDiscardedList = {
  type: typeof UPDATE_APPROVAL_AND_DISCARDED_LIST
  payload: {
    updated: {
      updatedApprovedList: UpdatedListItems[]
      updatedRejectedList: UpdatedListItems[]
    }
  }
}

export type PushApproveListToApi = {
  type: typeof PUSH_APPROVAL_LIST_TO_API
  payload: {
    list: ChildSpecificProperties
  }
}

export type UpdateCombinedCartTotal = {
  type: typeof UPDATE_COMBINED_CART_TOTAL
  payload: {
    total: CombinedCartTotals
  }
}

export type ClearCartAfterCompletedOrder = {
  type: typeof CLEAR_CART_AFTER_COMPLETED_ORDER
}

export type CartActions =
  | FetchWishList
  | LoadUiWithFetchedWishlist
  | WishlistItemStatus
  | ExecuteWishListItemStatus
  | UpdateApprovalAndDiscardedList
  | PushApproveListToApi
  | UpdateCombinedCartTotal
  | ClearCartAfterCompletedOrder
