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
