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

    console.log(username, password)

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
        if (!res.data.success) {
          setIsLoading(false)
          setError(res.data.error)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { login, isLoading, error }
}