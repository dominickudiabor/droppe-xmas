import axios from 'axios'

export default {
  fetchWishList: async (id: number, type: 'single' | 'all') => {
    const endpoint = type === 'single' ? `/carts/${id}` : '/carts'
    try {
      const response = await axios.get(endpoint)
      return response.data
    } catch (error) {
      return error.response
    }
  },
}
