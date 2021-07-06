import axios from 'axios'
import moment from 'moment'
import { ChildSpecificProperties, UpdatedListItems, WishItems } from 'types'

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
