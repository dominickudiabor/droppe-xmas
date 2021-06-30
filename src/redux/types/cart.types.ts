export const INITIALIZE_PRODUCTS = 'INITIALIZE_PRODUCTS'

export interface CartState {
  products: []
  wishLists: { [name: string]: [] }
  approved: []
  discarded: []
}

export type InitializeProducts = {
  type: typeof INITIALIZE_PRODUCTS
  payload: {
    products: []
  }
}

export type CartActions = InitializeProducts
