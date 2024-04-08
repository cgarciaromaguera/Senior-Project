// ... other imports
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';
import './Login.css'; 
import logo from './logo.png';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
    console.log(error)
  }

  return (
      <div className='wrapper'>
      <form onSubmit={handleSubmit}>
      <div className="login">
        <img src={logo} alt="Logo" className="logo1" />
        <div className="input-container">
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{color:"red"}}>{error}</p>}
        <button className="login-button">Login</button> {/* Login button */}
        <div className="login-footer">
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          <a href="/signup" className="sign-up">Don't have an account? Sign Up</a>
        </div>
      </div>
      </form>
    </div>
  )
}  

export default Login;