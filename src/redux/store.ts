import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { AppState } from './models'
import rootReducer from './reducers'
import rootSaga from './sagas'

const initState: AppState = {
  ui: {
    loading: false,
  },
  cart: {
    wishLists: {},
    approved: [],
    discarded: [],
    total: {},
  },
}

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return { store, persistor }
}
