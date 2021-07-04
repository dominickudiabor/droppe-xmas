import React from 'react'

interface CheckoutItemProps {
  image: string
  title: string
  price: number
  quantity: number
}

export const CheckoutItem: React.FC<CheckoutItemProps> = ({
  image,
  title,
  price,
  quantity,
}) => {
  const computeDiscount = (price: number, quantity: number) => {
    const result = price * quantity * (1 - (quantity * 10) / 100)
    return result.toFixed(2)
  }

  return (
    <div className="checkout-item">
      <img className="checkout-item__image" src={image} alt={title} />
      <div className="checkout-item__content">
        <h4>{title}</h4>
        <div className="checkout-item__details">
          <p>
            Price:<span>{price} </span>
          </p>
          <p>
            Quantity:<span>{quantity} </span>
          </p>
          <p>
            Discount:
            <span>{quantity > 1 ? quantity * 10 : 0} %</span>
          </p>
          <p>
            Total:
            <span className="total">
              €{quantity > 1 ? computeDiscount(price, quantity) : price}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
