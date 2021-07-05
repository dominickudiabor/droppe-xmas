import { KIDS } from 'data/kids'
import moment from 'moment'
import { nanoid } from 'nanoid'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppState } from 'redux/models'
import { TargetChildProperties, UpdatedListItems } from 'types'

const Summary = () => {
  const history = useHistory()
  const { wishLists } = useSelector((state: AppState) => state.cart)

  const handleNavigation = () => history.push('/')

  const renderchildApprovalListDetails = (list: UpdatedListItems[]) => {
    if (list.length < 1) return <p>None</p>
    return list.map((l) => <p key={nanoid()}>{l.title}</p>)
  }

  const renderChildApprovedList = (kids: TargetChildProperties[]) => {
    return kids.map((k) => (
      <div className="confirmation__content-item" key={nanoid()}>
        <h4>{k.name}</h4>
        <h5>Approved</h5>
        {renderchildApprovalListDetails(wishLists[k.name].approved)}
        <h5>Discarded</h5>
        {renderchildApprovalListDetails(wishLists[k.name].discarded)}
      </div>
    ))
  }

  return (
    <div className="page">
      <div className="header">
        <h2>Summary</h2>
        <button onClick={handleNavigation}>Return to Homepage</button>
      </div>
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
          {renderChildApprovedList(KIDS.cartList)}
        </div>
      </div>
    </div>
  )
}

export default Summary
