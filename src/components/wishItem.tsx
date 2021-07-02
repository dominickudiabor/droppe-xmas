import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { executeWishListItemStatus } from 'redux/actions'
import { UpdatedListItems } from 'types'

const WishItem: React.FC<UpdatedListItems> = (props) => {
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()

  const handleApproval = () => {
    dispatch(
      executeWishListItemStatus({ item: props, status: 'Confirmed', name: id })
    )
  }

  const handleDiscard = () => {
    dispatch(
      executeWishListItemStatus({ item: props, status: 'Discarded', name: id })
    )
  }

  return (
    <div className="wishListCard">
      <div className="wishListCard__title">{props.title}</div>
      <div className="wishListCard__content">
        <img
          src={props.image}
          alt={props.title}
          className="wishListCard__content--image"
        />
        <p className="wishListCard__content--description">
          {props.description}
        </p>
      </div>
      <div className="wishListCard__summary">
        <p>
          Price: <span>{`€${props.price}`}</span>
        </p>
        <p>
          Status: <span>{props.confirmed}</span>
        </p>
        <button
          disabled={props.confirmed === 'Confirmed'}
          className="success"
          onClick={handleApproval}
        >
          Approve
        </button>
        <button
          disabled={props.confirmed === 'Discarded'}
          className="danger"
          onClick={handleDiscard}
        >
          Discard
        </button>
      </div>
    </div>
  )
}

export default WishItem
