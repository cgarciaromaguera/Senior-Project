import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import logo from './logo.png';
import profilePic from './exProfilePic.png';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMoneyContext } from '../hooks/useMoneyContext';
import { useLogout } from '../hooks/useLogout';

const Account = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const { money } = useMoneyContext()

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <div className='header'>
                <img src={logo} alt="Logo" className="logo" />
                <Link to="/account" style={{color: "black"}}>
                <h10 className="account"> Account </h10>
                </Link>
            </div>
            <div className="navigationBar">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 className='home-header'>Home</h1>
                </Link>
                <Link to="/mock-trading" style={{ textDecoration: 'none' }}>
                    <h1 className='mocktrade-header'>Your Stocks</h1>
                </Link>
                <Link to="/learn" style={{ textDecoration: 'none' }}>
                <h1 className='learn-header'>Learn</h1>
                </Link>
            </div>
            <div className='container'>
                <div className='profileContainer'>
                    <div className="profilePicContainer">
                        <img src={profilePic} alt="User Profile Picture" className="profilePic" />
                        <h3 className='infoBox'>Username: {user.username}</h3> 
                        <h3 className='infoBox'>Email: {user.email}</h3> 
                        <h4 className='infoBox'>Balance: ${money}</h4>           
                    </div> 
                    <div className='accountInfo'>
                        <div className='accountBox'>
                            <h1>Account Settings</h1>
                            <h1>History</h1>
                            <h1>Notifications</h1>
                            <h1>Privacy</h1>
                            <button onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;