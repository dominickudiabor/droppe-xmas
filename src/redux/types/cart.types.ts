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

export interface WishItems {
  productId: number
  quantity: number
}
export interface ItemDetails {
  id: number
  title: string
  price: number
  description: string
  image: string
  categoty: string
}
export interface UpdatedListItems extends WishItems, ItemDetails {}
export interface WishList {
  products: WishItems[]
}

export interface DetailProductList {
  list: UpdatedListItems[]
  name: string
}
