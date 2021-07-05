import WishItem from 'components/wishItem'
import { nanoid } from 'nanoid'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { AppState } from 'redux/models'
import { UpdatedListItems } from 'types'

const Cart: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const userWishList = useSelector(
    (state: AppState) => state.cart.wishLists[id]?.properties
  )

  const renderWishListDetails = (list: UpdatedListItems[] = []) => {
    return list.map((l) => (
      <div className="card" key={nanoid()}>
        {' '}
        <WishItem {...l} />{' '}
      </div>
    ))
  }
  const handleNavigation = () => history.push('/')

  return (
    <div className="page cart">
      <div className="header">
        <h2>{`Wishlist for ${id}`}</h2>
        <button onClick={handleNavigation}>Return to Homepage</button>
      </div>

      <div className="cart__list">{renderWishListDetails(userWishList)}</div>
    </div>
  )
}

export default Cart
