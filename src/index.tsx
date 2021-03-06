import Spinner from 'components/Spinner'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import './index.css'
import makeStore from './redux/store'
import * as serviceWorker from './serviceWorker'

const { store, persistor } = makeStore()

const WithProvider = () => (
  <Provider store={store}>
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </PersistGate>
    </Router>
  </Provider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
