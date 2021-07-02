import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  updateConfirmedWishList,
  updateDiscardedWishList,
  wishlistItemStatus,
} from 'redux/actions'
import { AppState } from 'redux/models'
import { UpdatedListItems } from 'types'

const WishItem: React.FC<UpdatedListItems> = (props) => {
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()
  const { approved, discarded } = useSelector((state: AppState) => state.cart)

  const handleApproval = () => {
    dispatch(wishlistItemStatus({ item: props, status: 'Confirmed', name: id }))
    dispatch(
      updateConfirmedWishList({ newItem: props, confirmedList: approved })
    )
  }

  const handleDiscard = () => {
    dispatch(wishlistItemStatus({ item: props, status: 'Discarded', name: id }))
    dispatch(
      updateDiscardedWishList({ newItem: props, confirmedList: discarded })
    )
  }

  return (
    <div className="wishList">
      <div className="wishList__title">{props.title}</div>
      <div className="wishList__content">
        <img
          src={props.image}
          alt={props.title}
          className="wishList__content--image"
        />
        <p className="wishList__content--description">{props.description}</p>
      </div>
      <div className="wishList__summary">
        <p>
          Price: <span>{`€${props.price}`}</span>
        </p>
        <p>
          Status: <span>{props.confirmed}</span>
        </p>
        <button className="success" onClick={handleApproval}>
          Approve
        </button>
        <button className="danger" onClick={handleDiscard}>
          Discard
        </button>
      </div>
    </div>
  )
}

export default WishItem
