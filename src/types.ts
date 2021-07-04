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
  category: string
  confirmed?: 'Pending' | 'Confirmed' | 'Discarded'
}
export interface UpdatedListItems extends WishItems, ItemDetails {
  approved?: UpdatedListItems[]
  discarded?: UpdatedListItems[]
}
export interface WishList {
  products: WishItems[]
}

export interface DetailProductList {
  list: UpdatedListItems[]
  name: string
}

export interface CartListProperties {
  id: number
  name: string
  age: number
}

export interface WishListStatusConfirmation {
  item: UpdatedListItems
  status: 'Confirmed' | 'Discarded'
  name: string
}
export interface UpdateCredentials {
  item: UpdatedListItems
  name: string
}

export interface ApprovalAndDiscardedList {
  updatedApprovedList: UpdatedListItems[]
  updatedRejectedList: UpdatedListItems[]
}
