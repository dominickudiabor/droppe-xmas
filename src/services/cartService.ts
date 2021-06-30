import axios from 'axios'

export default {
  fetchWishList: async (id: number) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/carts/${id}`)
      return response.data
    } catch (error) {
      return error.response
    }
  },
}
