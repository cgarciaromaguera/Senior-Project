import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (username, password) => {
    console.log("LOGIN")
    setIsLoading(true)
    setError(null)

    console.log("here")

    await axios.post('http://localhost:5000/api/user/login', {
      username: username,
      password: password 
    })
      .then((res) => {
        console.log(res.data.success)
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
      .catch((error) => {
        console.log(error)
      })
  }

  return { login, isLoading, error }
}