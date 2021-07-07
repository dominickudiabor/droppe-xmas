import Page from 'components/Page'
import WishListCard from 'components/WishItem'
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
        <WishListCard itemDetails={{ ...l }} />
      </div>
    ))
  }
  const handleNavigation = () => history.push('/')

  return (
    <Page header={`Wishlist for ${id}`}>
      <div className="cart__list">
        {renderWishListDetails(userWishList)}
        <div className="base-buttons">
          <button onClick={handleNavigation}>Return to Homepage</button>
        </div>
      </div>
    </Page>
  )
}

export default Cart
