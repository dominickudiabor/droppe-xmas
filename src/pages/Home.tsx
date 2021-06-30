import { Card } from 'components/card'
import { Page } from 'components/page'
import { KIDS } from 'data/kids'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

export const Home = () => {
  function renderCartList(cartList: { name: string; age: number }[]) {
    return cartList.map((c) => (
      <div key={uuidv4()} className="list__item">
        <p>
          <span>{c.name},</span> <span>{c.age}years</span>
        </p>
        <button>View Cart</button>
      </div>
    ))
  }

  return (
    <Page>
      <Card>
        <h3>CartList</h3>
        <div className="list">{renderCartList(KIDS.cartList)}</div>
      </Card>
    </Page>
  )
}
