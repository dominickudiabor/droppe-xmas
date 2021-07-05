import { CheckoutItem } from 'components/checkoutItem'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { pushApprovesListToApi } from 'redux/actions'
import { AppState } from 'redux/models'
import checkoutService from 'services/checkoutService'
import { UpdatedListItems } from 'types'

const Checkout = () => {
  const [total, setTotal] = useState(0)
  const history = useHistory()
  const dispatch = useDispatch()

  const { approved, discarded, wishLists } = useSelector(
    (state: AppState) => state.cart
  )

  useEffect(() => {
    async function loadTotal() {
      const grandTotal = await checkoutService.computeTotalOnListItems(approved)
      setTotal(grandTotal)
    }
    loadTotal()
  }, [approved])

  const handleNavigation = () => history.goBack()
  const handleConfirmation = () => {
    dispatch(pushApprovesListToApi(wishLists))
    history.push('/summary')
  }

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

        {l === 'Approved' && (
          <div className="checkout__base">
            <p>
              GrandTotal: <span>€{total}</span>
            </p>
            <button onClick={handleConfirmation}>Proceed to confirm</button>
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="page">
      <div className="header">
        <h2>Checkout</h2>
        <button onClick={handleNavigation}>Return to edit</button>
      </div>
      <div className="checkout">
        {renderCheckoutLists(['Approved', 'Discarded'])}
      </div>
    </div>
  )
}
export default Checkout
