import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

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