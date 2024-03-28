import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'

export const useSignup= () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

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