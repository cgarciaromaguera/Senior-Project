import './Home.css'; 
import logo from './logo.png';

const Home = () => {
    return (
        <div className="logo">
            <img src={logo} alt="Logo" className="logo" /> {/* Include the logo */}
            <h8 className="account"> Account </h8>

            <div className="searchbar">
                
            </div>
            <div className="navigationBar">
                
            </div>
        </div>
    )
  }  
  export default Home;