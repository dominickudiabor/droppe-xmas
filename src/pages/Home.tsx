import Page from 'components/Page'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
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
  const [childListItemsConfirmed, setChildListItemsConfirmed] = useState<{
    [name: string]: boolean
  }>({})

  const [activateCheckout, setActivateCheckout] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const { wishLists } = useSelector((state: AppState) => state.cart)
  const { users } = useSelector((state: AppState) => state.ui)

  useEffect(() => {
    async function findAggregate() {
      const unconfirmedListItem = await checkoutService.findUnconfirmedItem(
        wishLists
      )

      if (unconfirmedListItem) {
        setChildListItemsConfirmed(unconfirmedListItem.aggregatedConfirmedList)
        setActivateCheckout(unconfirmedListItem.allItemsConfirmed)
      }
    }
    findAggregate()
  }, [wishLists])

  const loadWishList = (name: string, id: number) => {
    dispatch(fetchWishList(id, name))
    history.push(`/cart/${name}`)
  }

  const renderCartList = (cartList: UserListProperties[]) => {
    return cartList.map((c) => (
      <div key={nanoid()} className="list__item">
        <p>
          <span>{`${c.name.firstname} ${c.name.lastname}`}</span>
        </p>
        <button
          className={childListItemsConfirmed[c.name.firstname] ? '' : 'edit'}
          onClick={() => loadWishList(c.name.firstname, c.id)}
        >
          {childListItemsConfirmed[c.name.firstname]
            ? 'Edit WishList'
            : ' View Wishlist'}
        </button>
      </div>
    ))
  }

  const handleCheckout = async (data: ChildSpecificProperties) => {
    const response = await checkoutService.createAggregatedList(data)
    if (!response) return
    const { updatedApprovedList, updatedRejectedList } = response
    console.log(updatedApprovedList)
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
          disabled={
            activateCheckout && users.length === Object.keys(wishLists).length
              ? false
              : true
          }
          onClick={() => handleCheckout(wishLists)}
        >
          Proceed to Checkout
        </button>
      </div>
    </Page>
  )
}

export default Home
