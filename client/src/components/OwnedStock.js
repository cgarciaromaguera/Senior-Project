// Stock.js
import React, { useState } from 'react';
import Popup from './Popup'; // Import the Popup component

const OwnedStock = (props) => {
    const { ticker, name, session: boughtSession } = props.boughtStock;
    const { session: currentSession } = props.currentStock
    const shares = props.shares
    const profit = (currentSession.price * shares) - (boughtSession.price * shares)
    const priceFixed = boughtSession?.price?.toFixed(2) ?? 'N/A';

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

    return (
        <div className="stock" style={stockCardStyle}>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{ticker}</span>
            <span style={nameStyle} title={name}>{name}</span>

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
            <div style={{ fontSize: '20px', marginTop: '5px' }}>Sell {shares} shares for a profit of {profit}</div>
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
            
            <Popup
            isVisible={isPopupVisible}
            stock={{
              ticker,
              priceFixed: boughtSession?.price?.toFixed(2) ?? 'N/A'
            }}
            rawStock={props.boughtStock}
            onClose={togglePopup}
            changeMoney={(amount) => {props.changeMoney(amount)}}
        />
        </div>
    );
};

export default OwnedStock;