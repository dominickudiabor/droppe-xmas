import axios from 'axios'
import moment from 'moment'
import { ChildSpecificProperties, UpdatedListItems, WishItems } from 'types'

const cartService = {
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
      //loop through user list and fetch all product information
      for (const name of list) {
        const response = await axios.get(`/products/${name.productId}`)
        accList.push({
          ...response.data,
          confirmed: 'Pending',
          quantity: 1,
          productId: name.productId,
        })
      }
      return accList
    } catch (error) {
      return
    }
  },

  pushConfirmedListsToApi: async (list: ChildSpecificProperties) => {
    let combinedResponse: {}[] = []
    try {
      for (const key in list) {
        const combinedList = [...list[key].approved, ...list[key].discarded]

        for (const key of combinedList) {
          const response = await axios.post('/carts', {
            userId: key.id,
            date: moment().format('YYYY-MM-DD'),
            products: combinedList,
          })

          await combinedResponse.push({ ...response.data })
        }
      }

      return combinedResponse
    } catch (error) {}
  },
}
export default cartService
