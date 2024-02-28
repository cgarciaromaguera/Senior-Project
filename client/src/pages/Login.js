import './Login.css'; 
import logo from './logo.png';

const Login = () => {
    return (
        <div className="login">
            <img src={logo} alt="Logo" className="logo" /> {/* Include the logo */}
            <h2>Login</h2>
            <div className="input-container">
                <input type="text" placeholder="Username" />
            </div>
            <div className="input-container">
                <input type="password" placeholder="Password" />
            </div>
        </div>
    )
  }  
  export default Login;