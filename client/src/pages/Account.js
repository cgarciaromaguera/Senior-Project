import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import logo from './logo2.png';
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
        <div className='accountdisplay'>
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
                        <p className='infoBox' style={{fontSize: '18px'}}><strong>Username:</strong> {user.username}</p> 
                        <p className='infoBox' style={{fontSize: '18px'}}><strong>Email:</strong> {user.email}</p> 
                        <p className='infoBox' style={{fontSize: '18px'}}><strong>Balance:</strong> ${money}</p> 
                    </div> 
                    <div className='accountInfo'>
                        <div className='accountBox'>
                            <h3>Account Settings</h3>
                            <h3>History</h3>
                            <h3>Notifications</h3>
                            <h3>Privacy</h3>
                            <button className= 'logoutButton' onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;