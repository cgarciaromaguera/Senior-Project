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
    
    console.log("before login hook")
    await login(username, password)
  }

  return (
    <form>
      <div className="login">
        <img src={logo} alt="Logo" className="logo-login" />
        <div className="input-container-login">
          <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
        </div>
        <div className="input-container-login">
          <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <button className="login-button" onSubmit={handleSubmit}>Login</button> {/* Login button */}
        <div className="login-footer">
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          <a href="/signup" className="sign-up">Don't have an account? Sign Up</a>
        </div>
        
      </div>
    </form>
  )
}  

export default Login;