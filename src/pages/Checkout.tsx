import { CheckoutItem } from 'components/checkoutItem'
import { nanoid } from 'nanoid'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppState } from 'redux/models'
import { UpdatedListItems } from 'types'

const Checkout = () => {
  const history = useHistory()
  const { approved, discarded } = useSelector((state: AppState) => state.cart)

  const handleNavigation = () => history.goBack()
  const handleConfirmation = () => history.push('/confirmation')

  const renderTypeSpecificList = (listType: UpdatedListItems[]) => {
    return (
      <div className="card__items">
        {listType.length < 1 ? (
          <h3>No items found</h3>
        ) : (
          listType.map((item) => (
            <CheckoutItem
              key={nanoid()}
              image={item.image}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))
        )}
      </div>
    )
  }

  const renderCheckoutLists = (lists: String[]) => {
    return lists.map((l) => (
      <div className="card" key={nanoid()}>
        <h2>{l}</h2>
        {l === 'Approved' ? (
          renderTypeSpecificList(approved)
        ) : l === 'Discarded' ? (
          renderTypeSpecificList(discarded)
        ) : (
          <p className="checkout__error">Error lists not found</p>
        )}
      </div>
    ))
  }

  return (
    <div className="page">
      <div className="header">
        <h2>Checkout</h2>
        <button onClick={handleNavigation}>Return to edit</button>
        <button onClick={handleConfirmation}>Proceed to confirm</button>
      </div>
      <div className="checkout">
        {renderCheckoutLists(['Approved', 'Discarded'])}
      </div>
    </div>
  )
}
export default Checkout
