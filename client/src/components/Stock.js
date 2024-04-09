// Stock.js
import React, { useState } from 'react';
import Popup from './Popup'; // Import the Popup component

const Stock = ({ stock }) => {
    const { ticker, name, session } = stock;
    const priceFixed = session?.price?.toFixed(2) ?? 'N/A';
    const changeFixed = session?.change?.toFixed(2) ?? 'N/A';
    const changePercentFixed = session?.change_percent?.toFixed(2) ?? 'N/A';
    const volumeString = session?.volume?.toLocaleString() ?? 'N/A';
    const isPositive = session?.change >= 0;

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
        width: '250px',
        height: '200px'
    };

    // Style for the name of the stock
    const nameStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '90%',
        textAlign: 'center',
        marginBottom: '5px' // Add some margin at the bottom
    };

    // Style for the price of the stock
    const priceStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        margin: '5px 0'
    };

    // Style for the change and percentage change
    const changeStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: isPositive ? 'green' : 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    // Style for the triangle indicating the direction of the change
    const triangleStyle = {
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: isPositive ? '10px solid green' : '10px solid red',
        marginRight: '5px'
    };

    return (
        <div className="stock" style={stockCardStyle}>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{ticker}</span>
            <span style={nameStyle} title={name}>{name}</span>
            <span style={priceStyle}>${priceFixed}</span>
            <div style={changeStyle}>
                <div style={triangleStyle}></div>
                {changeFixed} ({changePercentFixed}%)
            </div>
            <span style={{ fontSize: '12px', color: '#666' }}>Volume: {volumeString}</span>
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
                    marginTop: 'auto'
                }}
                onClick={togglePopup}
            >
                Buy
            </button>
            
            <Popup
            isVisible={isPopupVisible}
            stock={{
              ticker,
              priceFixed: session?.price?.toFixed(2) ?? 'N/A'
            }}
            onClose={togglePopup}
            onPurchase={(ticker, amount) => {
                console.log(`Purchased ${amount} of ${ticker}`);
                // Here you would handle the logic for purchasing stocks
                // This could involve setting state, calling an API, etc.
            }}
        />
        </div>
    );
};

export default Stock;