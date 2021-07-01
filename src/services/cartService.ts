import axios from 'axios'
import { WishItems } from 'redux/types/cart.types'

export default {
  fetchListPerChild: async (
    id: number,
    type: 'single-cart' | 'single-product'
  ) => {
    const endpoint = type === 'single-cart' ? `/carts/${id}` : `/products/${id}`
    try {
      const response = await axios.get(endpoint)
      return response.data
    } catch (error) {
      return error.response
    }
  },
  loopListFetchProducts: async (list: WishItems[]) => {
    const accList = []
    try {
      for (let i = 1; i <= list.length; i++) {
        const response = await axios.get(`/products/${i}`)
        accList.push({ ...response.data, ...list[i - 1] })
      }
      return accList
    } catch (error) {
      return
    }
  },
}
