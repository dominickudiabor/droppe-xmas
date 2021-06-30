import { Card } from 'components/card'
import { Page } from 'components/page'
import { KIDS } from 'data/kids'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { setLoading } from 'redux/actions'
import { AppState } from 'redux/models'
import cartService from 'services/cartService'

export const Cart: React.FC = (props) => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const dispatch = useDispatch()
  const { loading } = useSelector((state: AppState) => state.ui)

  useEffect(() => {
    dispatch(setLoading(true))
    async function loadList() {
      const wishList = await cartService.fetchWishList(parseInt(id), 'single')
      dispatch(setLoading(false))
      console.log(wishList)
    }
    loadList()
  }, [dispatch, id])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Page>
      <Card
        title={`Wishlist - ${
          KIDS.cartList.find((a) => a.id === parseInt(id))?.name
        }`}
      >
        <div>List Goes Here</div>
        <button onClick={() => history.goBack()}>Return to CartList</button>
      </Card>
    </Page>
  )
}
