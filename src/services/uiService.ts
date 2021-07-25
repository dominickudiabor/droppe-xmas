import axios from 'axios'

const uiService = {
  fetchUserList: async () => {
    try {
      const response = await axios.get(`/users?limit=5`)
      return response.data
    } catch (error) {
      return error.response
    }
  },
}
export default uiService
