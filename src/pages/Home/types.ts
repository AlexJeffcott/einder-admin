import { initialState } from './index'

export type Action =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' }

export type State = typeof initialState

export interface Actions {
  incrementHomePageCounter: () => void
  decrementHomePageCounter: () => void
  resetHomePageCounter: () => void
}

export type WrapperProps = {}

export type HomePageProps = State & Actions & WrapperProps

export type Theme = "dark" | "light" | "default"

export function defaultGuard<S>(state: S, action: never) {
  return state
}
