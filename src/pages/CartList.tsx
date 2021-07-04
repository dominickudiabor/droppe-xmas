import { KIDS } from 'data/kids'
import { nanoid } from 'nanoid'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  fetchWishList,
  updateApprovalAndDiscardedList,
} from 'redux/actions/cart'
import { AppState } from 'redux/models'
import { ChildSpecificProperties } from 'redux/types/cart.types'
import checkoutService from 'services/checkoutService'
import { CartListProperties } from 'types'

export const CartList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { wishLists } = useSelector((state: AppState) => state.cart)
  const defaultChildlist = KIDS.cartList

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

  const loadWishList = (name: string, id: number) => {
    history.push(`/cart/${name}`)
    if (!!wishLists[name]) return
    dispatch(fetchWishList(id, name))
  }

  const handleCheckout = async (data: ChildSpecificProperties) => {
    const {
      updatedApprovedList,
      updatedRejectedList,
    } = await checkoutService.createAggregatedList(data)

    dispatch(
      updateApprovalAndDiscardedList({
        updatedApprovedList,
        updatedRejectedList,
      })
    )
    history.push('/checkout')
  }

  return (
    <div className="page">
      <div className="header">
        <h2>Droppe Xmas</h2>
        <button
          // disabled={defaultChildlist.length !== Object.keys(wishLists).length}
          onClick={() => handleCheckout(wishLists)}
        >
          Proceed to Checkout
        </button>
      </div>

      <div className="card">
        <div className="list">{renderCartList(defaultChildlist)}</div>
      </div>
    </div>
  )
}
