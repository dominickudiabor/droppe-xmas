import React, { ReactNode } from 'react'

interface PageProps {
  header: string
  children: ReactNode
  button?: { name: string; purpose: () => void }
}

const Page: React.FC<PageProps> = ({ header, children, button }) => (
  <div className="page">
    <div className="header">
      <h2>{header}</h2>
      {button && <button onClick={button?.purpose}>{button?.name}</button>}
    </div>
    {children}
  </div>
)
export default Page
