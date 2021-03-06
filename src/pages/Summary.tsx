import Page from 'components/Page'
import moment from 'moment'
import { nanoid } from 'nanoid'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearCartAfterCompletedOrder } from 'redux/actions'
import { AppState } from 'redux/models'
import { CartTotal, UpdatedListItems, UserListProperties } from 'types'

const Summary = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { wishLists, total } = useSelector((state: AppState) => state.cart)
  const { users } = useSelector((state: AppState) => state.ui)

  const totalApprove = total['approved']
  const totalDiscarded = total['discarded']

  const cartTotalforWishlists = [totalApprove, totalDiscarded]

  const handleNavigation = () => {
    dispatch(clearCartAfterCompletedOrder())
    history.push('/')
  }

  const renderchildApprovalListDetails = (list: UpdatedListItems[]) => {
    if (list.length < 1) return <p>None</p>
    return list.map((l) => (
      <div key={nanoid()}>
        <p key={nanoid()}>{l.title}</p>
      </div>
    ))
  }

  const renderChildApprovedList = (users: UserListProperties[]) => {
    return users.map((k) => {
      if (!wishLists[k.name.firstname]) return null

      return (
        <div className="confirmation__content-item" key={nanoid()}>
          <h4>{k.name.firstname}</h4>
          <h5>Approved</h5>
          {renderchildApprovalListDetails(wishLists[k.name.firstname].approved)}
          <h5>Discarded</h5>
          {renderchildApprovalListDetails(
            wishLists[k.name.firstname].discarded
          )}
        </div>
      )
    })
  }

  const renderTotalCartListDetails = (cartTotal: CartTotal[]) => {
    return cartTotal.map((c) => (
      <div key={nanoid()} className="confirmation__content--total">
        <h3>{`Order total for ${c.type} list`}</h3>
        <div className="confirmation__content--total--detail">
          <p>
            <span>Subtotal </span>
            <span>€{c.before}</span>
          </p>
          <p>
            <span>Discount</span>
            <span> - €{c.before - c.after}</span>
          </p>
          <p>
            <span>Total after discount</span>
            <span>€{c.after}</span>
          </p>
        </div>
      </div>
    ))
  }

  return (
    <Page header="Summary">
      <div className="confirmation">
        <div className="confirmation__header title">
          <h2>ORDER CONFIRMATION</h2>
          <p>
            Thank you for your order , we would contact you as soon as your
            package is shipped. You can find your purchase information below.
          </p>
        </div>
        <div className="confirmation__header subtitle">
          <h3>Order Summary</h3>
          <p>{moment().format('YYYY-MM-DD')}</p>
        </div>
        <div className="confirmation__content">
          {renderChildApprovedList(users)}
          {renderTotalCartListDetails(cartTotalforWishlists)}
        </div>
        <div className="base-buttons">
          <button onClick={handleNavigation}>Return to Homepage</button>
        </div>
      </div>
    </Page>
  )
}

export default Summary
