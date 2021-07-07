import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateWishlistItemApprovalStatus } from 'redux/actions'
import { UpdatedListItems } from 'types'

interface WishItemProps {
  itemDetails: UpdatedListItems
}

const WishItem: React.FC<WishItemProps> = ({ itemDetails }) => {
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()

  const handleApproval = () => {
    dispatch(
      updateWishlistItemApprovalStatus({
        item: itemDetails,
        status: 'Confirmed',
        name: id,
      })
    )
  }

  const handleDiscard = () => {
    dispatch(
      updateWishlistItemApprovalStatus({
        item: itemDetails,
        status: 'Discarded',
        name: id,
      })
    )
  }

  return (
    <div className="wishListCard">
      <div className="wishListCard__title">{itemDetails.title}</div>
      <div className="wishListCard__content">
        <img
          src={itemDetails.image}
          alt={itemDetails.title}
          className="wishListCard__content--image"
        />
        <p className="wishListCard__content--description">
          {itemDetails.description}
        </p>
      </div>
      <div className="wishListCard__summary">
        <p>
          Price: <span>{`€${itemDetails.price}`}</span>
        </p>
        <p>
          Status: <span>{itemDetails.confirmed}</span>
        </p>
        <button
          disabled={itemDetails.confirmed === 'Confirmed'}
          className="success"
          onClick={handleApproval}
        >
          Approve
        </button>
        <button
          disabled={itemDetails.confirmed === 'Discarded'}
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
