import { useState } from 'react';
import { useSignup } from '../hooks/useSignup'
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {signup, error, isLoading} = useSignup()
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordMatch(false)
    }
    else
      await signup(username, email, password)
  }

  const ErrorMessage = () => {
    if (!passwordMatch) {
      return (
        <div>
          <p style={{color:"red"}}>Passwords do not match.</p>
        </div>
      )
    }
    else if (error) {
      return (
        <div>
          <p style={{color:"red"}}>{error}</p>
        </div>
      )
    }
    else
      return null
  }

  return (
      <div className='page-wrapper'>
      <div className='page'>
      <form onSubmit={handleSubmit}>
        <div className="signup">
          <h2>Sign Up</h2>
          <p className="subtitle">Create Your Account</p>
          <div className="input-container">
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-container">
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-container" onChange={(e) => setConfirmPassword(e.target.value)} > 
            <input type="password" placeholder="Confirm Password" />
          </div>

          {<ErrorMessage/>}

          <button className="signup-button" disabled={isLoading}>Sign Up</button>
          <div className="signup-footer">
            <a href="/login">Already have an account? Login</a>
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default SignUp;
