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
    (state: AppState) => state.cart.wishLists[id]?.properties
  )

  function renderWishListDetails(list: UpdatedListItems[] = []) {
    return list.map((l) => (
      <div className="card" key={nanoid()}>
        {' '}
        <WishItem {...l} />{' '}
      </div>
    ))
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="page cart">
      <div className="header">
        <h2>{`Wishlist for ${id}`}</h2>
        <button onClick={() => history.goBack()}>Return to CartList</button>
      </div>

      {renderWishListDetails(userWishList)}
    </div>
  )
}
