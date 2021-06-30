import React from 'react'

interface CardProps {
  title: string
}

export const Card: React.FC<CardProps> = (props) => (
  <div className="card">
    <h2>{props.title}</h2>
    {props.children}
  </div>
)
