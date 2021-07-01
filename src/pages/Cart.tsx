import { Card } from 'components/card'
import { Page } from 'components/page'
import Spinner from 'components/spinner'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { AppState } from 'redux/models'
import { UpdatedListItems } from 'types'
import { v4 as uuidv4 } from 'uuid'

export const Cart: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const { loading } = useSelector((state: AppState) => state.ui)
  const userWishList = useSelector(
    (state: AppState) => state.cart.wishLists[id]
  )

  function renderWishListDetails(list: UpdatedListItems[] = []) {
    return list.map((l) => (
      <div key={uuidv4()} className="wishList">
        <div className="wishList__title">{l.title}</div>
        <div className="wishList__content">
          <img
            src={l.image}
            alt={l.title}
            className="wishList__content--image"
          />
          <p className="wishList__content--description">{l.description}</p>
        </div>
        <div className="wishList__summary">
          <p>
            Price: <span>{`€${l.price}`}</span>
          </p>
          <p>
            Quantity: <span>{`€${l.quantity}`}</span>
          </p>
          <p>
            Discount: <span>{`€${l.quantity}`}</span>
          </p>
          <p>
            Total: <span>{`€${l.quantity * l.price}`}</span>
          </p>
        </div>
      </div>
    ))
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
