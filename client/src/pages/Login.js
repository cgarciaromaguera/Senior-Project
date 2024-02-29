// ... other imports
import './Login.css'; 
import logo from './logo.png';

const Login = () => {
  return (
    <div className="login">
      <img src={logo} alt="Logo" className="logo" />
      <div className="input-container">
        <input type="text" placeholder="Username" />
      </div>
      <div className="input-container">
        <input type="password" placeholder="Password" />
      </div>
      <button className="login-button">Login</button> {/* Login button */}
      <div className="login-footer">
        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        <a href="/sign-up" className="sign-up">Don't have an account? Sign Up</a>
      </div>
    </div>
  )
}  

export default Login;
