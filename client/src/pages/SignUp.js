import './SignUp.css';

const SignUp = () => {
  return (
    <div className='page-wrapper'>
      <div className='page'>
        <div className="signup">
          <h2>Sign Up</h2>
          <p className="subtitle">Create Your Account</p>
          <div className="input-container">
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-container">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Confirm Password" />
          </div>
          <button className="signup-button">Sign Up</button>
          <div className="signup-footer">
            <a href="/login">Already have an account? Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;