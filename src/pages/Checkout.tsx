import { CheckoutItem } from 'components/checkoutItem'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { pushApprovesListToApi, updateCombinedCartTotal } from 'redux/actions'
import { AppState } from 'redux/models'
import checkoutService from 'services/checkoutService'
import { UpdatedListItems } from 'types'

const Checkout = () => {
  const [approvedTotal, setApprovedTotal] = useState({ before: 0, after: 0 })
  const [discardedTotal, setDiscardedTotal] = useState({ before: 0, after: 0 })
  const history = useHistory()
  const dispatch = useDispatch()

  const { approved, discarded, wishLists } = useSelector(
    (state: AppState) => state.cart
  )

  useEffect(() => {
    async function loadTotal(
      list: UpdatedListItems[],
      setTotal: {
        (value: React.SetStateAction<{ before: number; after: number }>): void
        (value: React.SetStateAction<{ before: number; after: number }>): void
        (arg0: { before: number; after: number }): void
      }
    ) {
      const { before, after } = await checkoutService.computeTotalOnListItems(
        list
      )
      setTotal({ before, after })
    }
    loadTotal(approved, setApprovedTotal)
    loadTotal(discarded, setDiscardedTotal)
  }, [approved, discarded])

  const handleNavigation = () => history.goBack()
  const handleConfirmation = () => {
    dispatch(
      updateCombinedCartTotal({
        approved: approvedTotal,
        discarded: discardedTotal,
      })
    )
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
        <div className="checkout__base">
          <p>
            Price before Discount:
            <span>
              €{l === 'Approved' ? approvedTotal.before : discardedTotal.before}
            </span>
          </p>
          <p>
            Price after Discount:{' '}
            <span>
              €{l === 'Approved' ? approvedTotal.after : discardedTotal.after}
            </span>
          </p>
          {l === 'Approved' && (
            <button onClick={handleConfirmation}>Confirm List</button>
          )}
        </div>
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
