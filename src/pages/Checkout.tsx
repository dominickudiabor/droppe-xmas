import React from 'react'
import { useHistory } from 'react-router-dom'

const Checkout = () => {
  const history = useHistory()
  const handleNavigation = () => history.goBack()
  return (
    <div className="page">
      <div className="header">
        <h2>Checkout</h2>
        <button
          // disabled={defaultChildlist.length !== Object.keys(wishLists).length}
          onClick={handleNavigation}
        >
          Return
        </button>
      </div>
    </div>
  )
}
export default Checkout
