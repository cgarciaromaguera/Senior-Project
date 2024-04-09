// Popup.js
import React, { useState } from 'react';

const Popup = ({ isVisible, stock = {}, onClose, onPurchase }) => {
    const [inputAmount, setInputAmount] = useState('');

    // Function to handle the buying process
    const handleBuy = () => {
        // Remove the dollar sign before parsing
        const amount = inputAmount.replace(/^\$/, '');
        if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
            if (stock.ticker && stock.priceFixed) {
                onPurchase(stock.ticker, amount);
                onClose(); // Close the popup after buying
            } else {
                alert('Stock information is not available.');
            }
        } else {
            alert('Please enter a valid amount.');
        }
    };

    if (!isVisible) return null;

    // Input validation and setting the input amount
    const handleInputChange = (e) => {
        const value = e.target.value.replace(/^\$/, '');
        if (value === '' || /^\d*\.?\d*$/.test(value)) { // Allows decimal numbers
            setInputAmount(`$${value}`); // Add the dollar sign to the input
        }
    };

    return (
        <div style={{
            position: 'fixed',
            zIndex: 100,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
            <div style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                width: '300px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                }}>Close</button>
                <div style={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '10px' }}>{stock.ticker}</div>
                <div style={{ alignSelf: 'flex-start', marginLeft: '10px', marginBottom: '5px' }}>Input amount:</div>
                <input
                    style={{
                        fontSize: '16px',
                        padding: '10px',
                        paddingLeft: '30px', // Adjust padding to make room for the dollar sign
                        width: 'calc(80% - 30px)', // Adjust width to account for padding
                        margin: '10px 0',
                        position: 'relative'
                    }}
                    value={inputAmount}
                    onChange={handleInputChange}
                    placeholder="$"
                />
                <div style={{ marginLeft: '10px' }}>Shares: {inputAmount && stock.priceFixed !== 'N/A' ? 
                    (parseFloat(inputAmount.replace(/^\$/, '')) / parseFloat(stock.priceFixed)).toFixed(2) : 'N/A'}</div>
                <button 
                    onClick={handleBuy}
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginTop: '10px' // Added margin to space out the button
                    }}>
                    Buy
                </button>
            </div>
        </div>
    );
};

export default Popup;