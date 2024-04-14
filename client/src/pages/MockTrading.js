import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './MockTrading.css';
import logo from './logo2.png';
import OwnedStock from '../components/OwnedStock.js'
import { useMoneyContext } from '../hooks/useMoneyContext';
import { useStocksContext } from '../hooks/useStocksContext';
import { useAuthContext } from '../hooks/useAuthContext.js';

const MockTrading = () => {
    const { user } = useAuthContext()
    const { money } = useMoneyContext()
    const { stocks } = useStocksContext()
    const [owned, setOwned] = useState([])

    useEffect(() => {
        let s = []
        const getCurrentStocks = async () => {
            let tickers = Object.keys(stocks)

            let i = 0
            while (i !== Object.keys(stocks).length) {
                await axios.get(`https://api.polygon.io/v3/snapshot?ticker.any_of=${tickers[i]}&apiKey=6uOX_KEZHdvzqvHxUnHo5GiKCyaQtAhP`)
                    .then((res) => {
                        const currentStock = res.data.results[0]
                        const boughtStock = stocks[currentStock.ticker]
                        s.push(<OwnedStock boughtStock={boughtStock[0]} currentStock={currentStock} shares={boughtStock[1]}/>)
                    })
                i++
            }
            setOwned(s)
        } 

        getCurrentStocks()
    }, [user, stocks])

    return (
        <div className='mocktrading'>
            <div className='header'>
                <img src={logo} alt="Logo" className="logo" />
                <Link to="/account" style={{ textDecoration: 'none' }}>
                <h10 className="account"> Account </h10>
                </Link>
            </div>
            <div className="navigationBar">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 className='home-header'>Home</h1>
                </Link>
                <Link to="/mock-trading" style={{color:"black"}}>
                    <h1 className='mocktrade-header'>Your Stocks</h1>
                </Link>
                <Link to="/learn"style={{ textDecoration: 'none' }}>
                <h1 className='learn-header'>Learn</h1>
                </Link>

            </div>
            <div className='container'>
                <div className='currentStockContainer'>
                    <h1>Current Stocks:</h1>
                    <div>{owned && owned.map((row) => {return row})}</div>
                </div>
                <div className='rightside'>
                    <div className='balanceBox'>
                        <h1>Current Balance: <p>${money}</p></h1>
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