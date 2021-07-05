import React from 'react'
import { useHistory } from 'react-router-dom'

const Confirmation = () => {
  const history = useHistory()
  const handleNavigation = () => history.push('/')

  return (
    <div className="page">
      <div className="header">
        <h2>{'Confirmation'}</h2>
        <button onClick={handleNavigation}>Return to Homepage</button>
      </div>
      <div className="confirmation">
        <p>
          Thank you for using our service, your order details are found below.
        </p>
      </div>
    </div>
  )
}

export default Confirmation
