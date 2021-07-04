import React from 'react'
import { useHistory } from 'react-router-dom'

const Checkout = () => {
  const history = useHistory()
  const handleNavigation = () => history.goBack()
  return (
    <div className="page">
      <div className="header">
        <h2>Checkout</h2>
        <button onClick={handleNavigation}>Return</button>
      </div>
    </div>
  )
}
export default Checkout
