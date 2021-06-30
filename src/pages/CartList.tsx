import { Card } from 'components/card'
import { Page } from 'components/page'
import { KIDS } from 'data/kids'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export const CartList = () => {
  const history = useHistory()

  function renderCartList(cartList: { name: string; age: number }[]) {
    return cartList.map((c) => (
      <div key={uuidv4()} className="list__item">
        <p>
          <span>{c.name},</span> <span>{c.age}years</span>
        </p>
        <button onClick={() => history.push(`/cart/${c.name}`)}>
          View Cart
        </button>
      </div>
    ))
  }

  return (
    <Page>
      <Card title="CartList">
        <div className="list">{renderCartList(KIDS.cartList)}</div>
      </Card>
    </Page>
  )
}
