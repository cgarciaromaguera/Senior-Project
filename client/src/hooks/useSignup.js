import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'
import { useMoneyContext } from './useMoneyContext'
import { useStocksContext } from './useStocksContext'

export const useSignup= () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchMoney } = useMoneyContext()
  const { dispatch: dispatchStocks } = useStocksContext()

  const signup = async (username, email, password) => {
    setIsLoading(true)
    setError(null)

    await axios.post('/api/user/signup', {
      username: username,
      email: email,
      password: password 
    })
      .then((res) => {
        if (res.data.success) {
            localStorage.setItem('user', JSON.stringify(res.data))
            dispatch({type: 'LOGIN', payload: res.data})

            localStorage.setItem('money', res.data.money)
            dispatchMoney({type: 'SET_MONEY', payload: res.data.money})

            localStorage.setItem('stocks', res.data.stocks)
            dispatchStocks({type: 'SET_STOCKS', payload: res.data.stocks})

            setIsLoading(false)
        }
        if (!res.data.success) {
            setIsLoading(false)
            setError(res.error)
        }
      })
  }

  return { signup, isLoading, error }
}