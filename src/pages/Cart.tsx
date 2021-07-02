import { Card } from 'components/card'
import { Page } from 'components/page'
import Spinner from 'components/spinner'
import WishItem from 'components/wishItem'
import { nanoid } from 'nanoid'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { AppState } from 'redux/models'
import { UpdatedListItems } from 'types'

export const Cart: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const { loading } = useSelector((state: AppState) => state.ui)
  const userWishList = useSelector(
    (state: AppState) => state.cart.wishLists[id]
  )

  function renderWishListDetails(list: UpdatedListItems[] = []) {
    return list.map((l) => <WishItem {...l} key={nanoid()} />)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <Page>
      <Card title={`Wishlist - ${id}`}>
        {renderWishListDetails(userWishList)}
        <button onClick={() => history.goBack()}>Return to CartList</button>
      </Card>
    </Page>
  )
}
