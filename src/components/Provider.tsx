import React, { ReactNode } from 'react'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { reducer as rootReducer } from 'redux/rootReducer'
import { Store } from 'redux/types'

const composeEnhancers = process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

const store: Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

type Props = {
  children: ReactNode
}

export function StoreProvider(props: Props): JSX.Element {
  const { children } = props

  return <Provider store={store}>{children}</Provider>
}
