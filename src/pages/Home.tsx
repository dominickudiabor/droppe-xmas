import Page from 'components/Page'
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
import checkoutService from 'services/checkoutService'
import { CartListProperties, ChildSpecificProperties } from 'types'

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { wishLists } = useSelector((state: AppState) => state.cart)
  const defaultChildlist = KIDS.cartList

  const renderCartList = (cartList: CartListProperties[]) => {
    return cartList.map((c) => (
      <div key={nanoid()} className="list__item">
        <p>
          <span>{c.name},</span> <span>{c.age}years</span>
        </p>
        <button onClick={() => loadWishList(c.name, c.id)}>
          View Wishlist
        </button>
      </div>
    ))
  }

  const loadWishList = (name: string, id: number) => {
    history.push(`/cart/${name}`)
    if (!!wishLists[name]) return
    dispatch(fetchWishList(id, name))
  }

  const handleCheckout = async (data: ChildSpecificProperties) => {
    const response = await checkoutService.createAggregatedList(data)
    if (!response) return
    const { updatedApprovedList, updatedRejectedList } = response

    dispatch(
      updateApprovalAndDiscardedList({
        updatedApprovedList,
        updatedRejectedList,
      })
    )
    history.push('/checkout')
  }

  return (
    <Page header="Droppe Xmas">
      <div className="card">
        <div className="list">{renderCartList(defaultChildlist)}</div>
      </div>
      <div className="base-buttons">
        <button
          hidden={Object.keys(wishLists).length !== defaultChildlist.length}
          onClick={() => handleCheckout(wishLists)}
        >
          Proceed to Checkout
        </button>
      </div>
    </Page>
  )
}

export default Home
