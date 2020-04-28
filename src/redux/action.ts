import { Action } from './types'

function isPayloadAction<T extends string, P>(action: { type: T; payload?: P }): action is Action<T, P> {
  return action.payload !== undefined
}

export function createAction<T extends string>(type: T): Action<T>

export function createAction<T extends string, P>(type: T, payload: P): Action<T, P>

export function createAction<T extends string, P>(type: T, payload?: P): Action<T> | Action<T, P> {
  const action = { type, payload }
  return isPayloadAction(action) ? action : { type }
}
