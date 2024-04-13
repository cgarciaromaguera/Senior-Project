import { createContext, useReducer, useEffect } from 'react'

export const MoneyContext = createContext()

export const moneyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MONEY':
        return {
            money: action.payload
        }
    case 'CLEAR':
        return {
            money: null
        }
    default:
      return state
  }
}

export const MoneyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moneyReducer, {
    money: null
  })

  useEffect(() => {
    const money = JSON.parse(localStorage.getItem('money'))

    if (money) {
      dispatch({ type: 'SET_MONEY', payload: money }) 
    }
  }, [])

  console.log('MoneyContext state:', state)


  return (
    <MoneyContext.Provider value={{...state, dispatch}}>
      { children }
    </MoneyContext.Provider>
  )
}