import { useAuthContext } from './useAuthContext'
import { useMoneyContext } from './useMoneyContext'
import { useStocksContext } from './useStocksContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchMoney} = useMoneyContext()
  const {dispatch: dispatchStocks} = useStocksContext()
 
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    localStorage.removeItem('money')
    localStorage.removeItem('stocks')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchMoney({type: 'CLEAR' })
    dispatchStocks({type: 'CLEAR'})
  }

  return { logout }
}