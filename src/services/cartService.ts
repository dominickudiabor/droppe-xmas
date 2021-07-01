import axios from 'axios'
import { UpdatedListItems, WishItems } from 'types'

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
    const accList: UpdatedListItems[] = []
    try {
      for (let i = 0; i < list.length; i++) {
        const productId = list[i].productId
        const response = await axios.get(`/products/${productId}`)
        accList.push({ ...response.data, ...list[i] })
      }
      return accList
    } catch (error) {
      return
    }
  },
}
