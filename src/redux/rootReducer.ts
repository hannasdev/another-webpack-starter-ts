import { combineReducers, Reducer } from 'redux'

import { Actions, State } from './types'
// reducers
import { requestHandlerReducer } from './requestHandler'

export const reducer: Reducer<State, Actions> = combineReducers({ requestHandler: requestHandlerReducer.reducer })
