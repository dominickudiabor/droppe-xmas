import Page from 'components/Page'
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
import { ChildSpecificProperties, UserListProperties } from 'types'

const Home = () => {
  const [childListCountConfirmed, setChildListCountConfirmed] = useState<{
    [name: string]: boolean
  }>({})
  const [ischeckoutActivate, setIsCheckoutActivate] = useState(true)

  const history = useHistory()
  const dispatch = useDispatch()

  const { wishLists } = useSelector((state: AppState) => state.cart)
  const { users } = useSelector((state: AppState) => state.ui)

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

  const renderCartList = (cartList: UserListProperties[]) => {
    return cartList.map((c) => (
      <div key={nanoid()} className="list__item">
        <p>
          <span>{`${c.name.firstname} ${c.name.lastname}`}</span>
        </p>
        <button
          className={childListCountConfirmed[c.name.firstname] ? 'edit' : ''}
          onClick={() => loadWishList(c.name.firstname, c.id)}
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
    if (users.length !== Object.keys(wishLists).length && ischeckoutActivate)
      return
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
        <div className="list">{renderCartList(users)}</div>
      </div>
      <div className="base-buttons">
        <p className="error">
          Please confirm or discard each item in the lists to proceed to
          checkout
        </p>
        <button
          disabled={users.length !== Object.keys(wishLists).length}
          onClick={() => handleCheckout(wishLists)}
        >
          Proceed to Checkout
        </button>
      </div>
    </Page>
  )
}

export default Home
