import Page from 'components/Page'
import { KIDS } from 'data/kids'
import { nanoid } from 'nanoid'
import React, { useLayoutEffect, useState } from 'react'
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
  const [childListCountConfirmed, setChildListCountConfirmed] = useState<{
    [name: string]: boolean
  }>({})
  const [ischeckoutActivate, setIsCheckoutActivate] = useState(true)

  const history = useHistory()
  const dispatch = useDispatch()
  const defaultChildlist = KIDS.cartList

  const { wishLists } = useSelector((state: AppState) => state.cart)

  useLayoutEffect(() => {
    async function findAggregate() {
      const findComfimedList = await checkoutService.findUnconfirmedItem(
        wishLists
      )
      if (findComfimedList) {
        const { combinedAggregatedList, unconfirmed } = findComfimedList
        setChildListCountConfirmed(combinedAggregatedList)
        if (unconfirmed.length === 0) return setIsCheckoutActivate(true)
        setIsCheckoutActivate(unconfirmed.includes(true))
      }
    }
    findAggregate()
  }, [wishLists])

  const renderCartList = (cartList: CartListProperties[]) => {
    return cartList.map((c) => (
      <div key={nanoid()} className="list__item">
        <p>
          <span>{c.name},</span> <span>{c.age}years</span>
        </p>
        <button
          className={childListCountConfirmed[c.name] ? 'edit' : ''}
          onClick={() => loadWishList(c.name, c.id)}
        >
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

    return
  }

  return (
    <Page header="Droppe Xmas">
      <div className="card">
        <div className="list">{renderCartList(defaultChildlist)}</div>
      </div>
      <div className="base-buttons">
        <p className="error">
          Please confirm or discard each item in the lists to proceed to
          checkout
        </p>
        <button
          disabled={ischeckoutActivate}
          onClick={() => handleCheckout(wishLists)}
        >
          Proceed to Checkout
        </button>
      </div>
    </Page>
  )
}

export default Home
