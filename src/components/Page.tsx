import React, { ReactNode } from 'react'

interface PageProps {
  header: string
  children: ReactNode
}

const Page: React.FC<PageProps> = ({ header, children }) => (
  <div className="page">
    <div className="header">
      <h2>{header}</h2>
    </div>
    {children}
  </div>
)
export default Page
