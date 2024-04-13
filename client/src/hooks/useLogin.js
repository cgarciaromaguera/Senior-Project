import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'
import { useMoneyContext } from './useMoneyContext'
import { useStocksContext } from './useStocksContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchMoney } = useMoneyContext()
  const { dispatch: dispatchStocks } = useStocksContext()


  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    await axios.post('/api/user/login', {
      username: username,
      password: password 
    })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem('user', JSON.stringify(res.data))
          dispatch({type: 'LOGIN', payload: res.data})

          localStorage.setItem('money', res.data.money)
          dispatchMoney({type: 'SET_MONEY', payload: res.data.money})

          localStorage.setItem('stocks', JSON.stringify(res.data.stocks))
          dispatchStocks({type: 'SET_STOCKS', payload: res.data.stocks})
          
          setIsLoading(false)
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.error)
      })
  }

  return { login, isLoading, error }
}