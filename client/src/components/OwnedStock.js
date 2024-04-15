// OwnedStock.js
import React, { useState } from 'react';
import SellPopup from './SellPopup.js'
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useSell } from '../hooks/useSell.js';

const OwnedStock = (props) => {
    const { ticker, name, session: boughtSession } = props.boughtStock;
    const { session: currentSession } = props.currentStock
    const shares = props.shares
    const profit = (currentSession.price * shares) - (boughtSession.price * shares)
    const priceFixed = boughtSession?.price?.toFixed(2) ?? 'N/A';
    const { user } = useAuthContext()
    const { sell } = useSell()

    // State to manage popup visibility
    const [isPopupVisible, setPopupVisible] = useState(false);

    // Function to toggle the popup visibility
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    // Stock card styles
    const stockCardStyle = {
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
        width: '400px',
        height: '200px'
    };

    // Style for the name of the stock
    const nameStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '90%',
        textAlign: 'center',
    };

    // Style for the price of the stock
    const priceStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginTop: '5px',
        marginBottom: '0px'
    };

    const priceContainer = {
        display: 'flex',
        justifyContent: 'center',
    }

    const handleSale = (stock, change, shares) => {
        const _id = jwtDecode(user.token)._id    
        sell(_id, stock, change, shares)    
        

        console.log();
    }

    return (
        <div style={stockCardStyle}>

            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{ticker}</span>
            <span style={nameStyle} title={name}>{name}</span>
            <span style={{marginTop: '10px', fontSize:'15px'}}>Shares: {shares}</span>

            <div style={priceContainer}>
                <div style={{ marginLeft: 'auto', marginRight: '35px', textAlign: 'center' }}>
                    <p style={{fontSize: '15px', marginBottom: '0px'}}>Bought at:</p>
                    <p style={{...priceStyle}}>${priceFixed}</p>
                </div>
                <div style={{ marginLeft: '35px', marginRight: 'auto', textAlign: 'center' }}>
                    <p style={{fontSize: '15px', marginBottom: '0px'}}>Current:</p>
                    <p style={{...priceStyle}}>${currentSession.price.toFixed(2)}</p>
                </div>
            </div>
            <button
                style={{
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginTop: '10px'
                }}
                onClick={togglePopup}
            >
                Sell
            </button>
            
            <SellPopup
            isVisible={isPopupVisible}
            stock={{
              ticker,
              priceFixed: currentSession?.price?.toFixed(2) ?? 'N/A'
            }}
            boughtStock={props.boughtStock}
            currentStock={props.currentStock}
            onClose={togglePopup}
            onSell={handleSale}
            shares={{shares}}
        />
        </div>
    );
};

export default OwnedStock;