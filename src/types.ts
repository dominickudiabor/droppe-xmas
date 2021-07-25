export interface ChildSpecificProperties {
  [name: string]: {
    properties: UpdatedListItems[]
    approved: UpdatedListItems[]
    discarded: UpdatedListItems[]
  }
}
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
export interface UpdatedListItems extends WishItems, ItemDetails {}
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

export interface UserListProperties {
  id: number
  name: { firstname: string; lastname: string }
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

export interface UpdatedCartFromApi {
  id: number
  userId: number
  date: string
  products: WishItems[]
}

export interface TargetChildProperties {
  id: number
  name: string
  age: number
}

export interface CartTotal {
  before: number
  after: number
  type: 'approved' | 'discarded'
}

export interface CombinedCartTotals {
  [name: string]: CartTotal
}

export interface AggregatedChildConfirmList {
  [name: string]: boolean
}
