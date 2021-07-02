import axios from 'axios'
import { UpdatedListItems, WishItems } from 'types'

export default {
  fetchListPerChild: async (id: number) => {
    try {
      const response = await axios.get(`/carts/${id}`)
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
        accList.push({ ...response.data, ...list[i], confirmed: 'Pending' })
      }
      return accList
    } catch (error) {
      return
    }
  },
}
