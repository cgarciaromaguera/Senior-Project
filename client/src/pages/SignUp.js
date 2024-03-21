import { useState } from 'react';
import axios from 'axios';
import { useSignup } from '../hooks/useSignup'
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = [username, email, password]

    await signup(username, email, password)

    // axios.post('http://localhost:5000/api/user/signup', {
    //   username: username,
    //   email: email,
    //   password: password
    // })
    //   .then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.success)
    //       console.log('user added!')

    //       setUsername('')
    //       setEmail('')
    //       setPassword('')
    //       setConfirmPassword('')
    //     }
    //     else {
    //       console.log(res.data.error)
    //     }
    //   })
    //   .catch((res) => {
    //     console.log(res.toJSON())
    //   })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="signup">
        <h2>Sign Up</h2>
        <p className="subtitle">Create Your Account</p>
        <div className="input-container-signup">
          <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} value={username}/>
        </div>
        <div className="input-container-signup">
          <input type="email" placeholder="Email"  onChange={(e) => {setEmail(e.target.value)}} value={email}/>
        </div>
        <div className="input-container-signup">
          <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} value={password}/>
        </div>
        <div className="input-container-signup">
          <input type="password" placeholder="Confirm Password"  onChange={(e) => {setConfirmPassword(e.target.value)}} value={confirmPassword}/>
        </div>
        <button className="signup-button">Sign Up</button>
        <div className="signup-footer">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </form>
  )
}

export default SignUp;
