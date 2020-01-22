import React, {FC, Reducer, useReducer, } from 'react'
import '../../styles.css'
import HomePage from './HomePage'
import { State, Action, WrapperProps, defaultGuard } from './types'

export const initialState = {count: 0};

const reducer: Reducer<State, Action> = (
  state = initialState,
    action,
): State => {
  switch (action.type) {
    case 'increment':
      return {...state, count: state.count + 1};
    case 'decrement':
      return {...state, count: state.count - 1};
    case 'reset':
      return initialState;
    default:
      return defaultGuard(state, action);
  }
}

const HomePageWrapper: FC<WrapperProps> = props => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState)

  const actions = {
    incrementHomePageCounter: () => dispatch({type: 'increment'}),
    decrementHomePageCounter: () => dispatch({type: 'decrement'}),
    resetHomePageCounter: () => dispatch({type: 'reset'})
  }

  return <HomePage {...state} {...actions} {...props}/>
}

export default HomePageWrapper
