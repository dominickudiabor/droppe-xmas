import { Card } from 'components/card'
import { Page } from 'components/page'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { setLoading } from 'redux/actions'
import { AppState } from 'redux/models'
import cartService from 'services/cartService'

export const Cart: React.FC = (props) => {
  const { id } = useParams()
  const history = useHistory()
  const { loading } = useSelector((state: AppState) => state.ui)

  const Loader = () => <div>loading...</div>

  useEffect(() => {
    setLoading(true)
    async function loadList() {
      const wishList = await cartService.fetchWishList(1)
      setLoading(false)
      console.log(wishList)
    }
    loadList()
  }, [loading])

  return (
    <Page>
      <Card title={`Wishlist - ${id}`}>
        {loading ? <Loader /> : <div>List Goes Here</div>}
        <button onClick={() => history.goBack()}>Return to CartList</button>
      </Card>
    </Page>
  )
}
