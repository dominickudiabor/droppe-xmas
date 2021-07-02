import { KIDS } from 'data/kids'
import { nanoid } from 'nanoid'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchWishList } from 'redux/actions/cart'
import { AppState } from 'redux/models'
import { CartListProperties } from 'types'

export const CartList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { wishLists } = useSelector((state: AppState) => state.cart)

  function renderCartList(cartList: CartListProperties[]) {
    return cartList.map((c) => (
      <div key={nanoid()} className="list__item">
        <p>
          <span>{c.name},</span> <span>{c.age}years</span>
        </p>
        <button onClick={() => loadWishList(c.name, c.id)}>View Cart</button>
      </div>
    ))
  }

  function loadWishList(name: string, id: number) {
    history.push(`/cart/${name}`)
    if (!!wishLists[name]) return
    dispatch(fetchWishList(id, name))
  }

  return (
    <div className="page">
      <div className="header">
        <h2>Xmas CartList</h2>
        <button disabled={CartList.length === Object.keys(wishLists).length}>
          {' '}
          Proceed to Checkout
        </button>
      </div>

      <div className="card">
        <div className="list">{renderCartList(KIDS.cartList)}</div>
      </div>
    </div>
  )
}
