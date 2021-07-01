import { Card } from 'components/card'
import { Page } from 'components/page'
import Spinner from 'components/spinner'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { AppState } from 'redux/models'

export const Cart: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const { loading } = useSelector((state: AppState) => state.ui)

  if (loading) {
    return <Spinner />
  }

  return (
    <Page>
      <Card title={`Wishlist - ${id}`}>
        <div>List Goes Here</div>
        <button onClick={() => history.goBack()}>Return to CartList</button>
      </Card>
    </Page>
  )
}
