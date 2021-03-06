import { CheckoutItem } from 'components/CheckoutItem'
import Page from 'components/Page'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  pushApprovesListToApi,
  setLoading,
  updateCombinedCartTotal,
} from 'redux/actions'
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
    dispatch(setLoading(true))
    async function loadTotal(
      list: UpdatedListItems[],
      setTotal: {
        (value: React.SetStateAction<{ before: number; after: number }>): void
        (value: React.SetStateAction<{ before: number; after: number }>): void
        (arg0: { before: number; after: number }): void
      }
    ) {
      const response = await checkoutService.computeTotalOnListItems(list)
      if (!response) return
      const { before, after } = response
      setTotal({ before, after })
    }
    loadTotal(approved, setApprovedTotal)
    loadTotal(discarded, setDiscardedTotal)
    dispatch(setLoading(false))
  }, [approved, discarded, dispatch])

  const handleNavigation = () => history.push('/')
  const handleConfirmation = () => {
    dispatch(
      updateCombinedCartTotal({
        approved: { ...approvedTotal, type: 'approved' },
        discarded: { ...discardedTotal, type: 'discarded' },
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
              ???{l === 'Approved' ? approvedTotal.before : discardedTotal.before}
            </span>
          </p>
          <p>
            Price after Discount:{' '}
            <span>
              ???{l === 'Approved' ? approvedTotal.after : discardedTotal.after}
            </span>
          </p>
        </div>
      </div>
    ))
  }

  return (
    <Page
      header="Checkout"
      button={{ name: 'Confirm Approved List', purpose: handleConfirmation }}
    >
      <div className="checkout">
        {renderCheckoutLists(['Approved', 'Discarded'])}
      </div>
      <div className="base-buttons">
        <button onClick={handleNavigation}>Return to edit</button>
      </div>
    </Page>
  )
}
export default Checkout
