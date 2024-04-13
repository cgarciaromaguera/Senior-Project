import { createContext, useReducer, useEffect } from 'react'

export const StocksContext = createContext()

export const stocksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STOCKS':
        return {
            stocks: action.payload
        }
    case 'CLEAR':
        return {
            stocks: null
        }
    default:
      return state
  }
}

export const StocksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stocksReducer, {
    stocks: null
  })

  useEffect(() => {
    const stocks = JSON.parse(localStorage.getItem('stocks'))

    if (stocks) {
      dispatch({ type: 'SET_STOCKS', payload: stocks }) 
    }
  }, [])

  console.log('StocksContext state:', state)


  return (
    <StocksContext.Provider value={{...state, dispatch}}>
      { children }
    </StocksContext.Provider>
  )
}