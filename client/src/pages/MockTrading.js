import React from 'react';
import { Link } from 'react-router-dom';
import './MockTrading.css';
import logo from './logo.png';

const MockTrading = () => {
    return (
        <div>
            <div className='header'>
                <img src={logo} alt="Logo" className="logo" />
                <h10 className="account"> Account </h10>
            </div>
            <div className="navigationBar">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 className='home-header'>Home</h1>
                </Link>
                <Link to="/mock-trading">
                    <h1 className='mocktrade-header'>Your Stocks</h1>
                </Link>
                <h1 className='learn-header'>Learn</h1>
            </div>
            <div className='container'>
                <div className='currentStockContainer'>
                    <h1>Current Stocks:</h1>
                </div>
                <div className='rightside'>
                    <div className='balanceBox'>
                        <h1>Current Balance:</h1>
                    </div>
                    <div className='watchingBox'>
                        <h1>Stocks Watching:</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default MockTrading;