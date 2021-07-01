import { Card } from 'components/card'
import { Page } from 'components/page'
import { KIDS } from 'data/kids'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchWishList } from 'redux/actions/cart'
import { CartListProperties } from 'types'
import { v4 as uuidv4 } from 'uuid'

export const CartList = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  function renderCartList(cartList: CartListProperties[]) {
    return cartList.map((c) => (
      <div key={uuidv4()} className="list__item">
        <p>
          <span>{c.name},</span> <span>{c.age}years</span>
        </p>
        <button onClick={() => loadWishList(c.name, c.id)}>View Cart</button>
      </div>
    ))
  }

  function loadWishList(name: string, id: number) {
    history.push(`/cart/${name}`)
    dispatch(fetchWishList(id, name))
  }

  return (
    <Page>
      <Card title="CartList">
        <div className="list">{renderCartList(KIDS.cartList)}</div>
      </Card>
    </Page>
  )
}
