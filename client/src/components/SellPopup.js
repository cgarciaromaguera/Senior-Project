// Popup.js
import React, { useState } from 'react';

const SellPopup = ({ isVisible, stock = {}, boughtStock = {}, currentStock = {}, onClose, onSell, shares }) => {
    const [inputShares, setInputShares] = useState('');
    const [gain, setGain] = useState(false)

    // Function to handle the buying process
    const handleSell = () => {
        if (inputShares && !isNaN(inputShares) && parseFloat(inputShares) > 0) {
            if (stock.ticker && stock.priceFixed) {
                const boughtAmount = (parseFloat(inputShares) * parseFloat(boughtStock.session.price)).toFixed(2)
                const currentAmount = (parseFloat(inputShares) * parseFloat(stock.priceFixed)).toFixed(2)
                let change = (currentAmount - boughtAmount)
                const newShares = (shares.shares - inputShares).toFixed(2)

                onSell(boughtStock, change, newShares)
                onClose(); // Close the popup after selling
            } else {
                alert('Stock information is not available.');
            }
        } else {
            alert('Please enter a valid number of shares.');
        }
    };

    if (!isVisible) return null;

    // Input validation and setting the input amount
    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) { // Allows up to 2 decimal places
            setInputShares(value);
        }

        const boughtAmount = (parseFloat(inputShares) * parseFloat(boughtStock.session.price)).toFixed(2)
        const currentAmount = (parseFloat(inputShares) * parseFloat(stock.priceFixed)).toFixed(2)
        let change = (currentAmount - boughtAmount)

        change < 0 ? setGain(false) : setGain(true)
    };

    const getChange = () => {
        return (((parseFloat(inputShares) * parseFloat(stock.priceFixed)).toFixed(2))
                - ((parseFloat(inputShares) * parseFloat(boughtStock.session.price)).toFixed(2))).toFixed(2)
    }

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
                <div style={{ alignSelf: 'flex-start', marginLeft: '10px', marginTop: '5px' }}>You own: {shares.shares} shares</div>
                <div style={{ alignSelf: 'flex-start', marginLeft: '10px', marginBottom: '5px' }}>Amount of shares to sell:</div>
                <input
                    style={{
                        fontSize: '16px',
                        padding: '10px',
                        paddingLeft: '12px', // Adjust padding to make room for the dollar sign
                        width: 'calc(80% - 30px)', // Adjust width to account for padding
                        marginTop: '10px',
                        marginBottom: '10px',
                        marginLeft: '10px',
                        position: 'relative'
                    }}
                    value={inputShares}
                    onChange={handleInputChange}
                    placeholder="0.00"
                />
                {
                parseFloat(inputShares) && parseFloat(inputShares) <= shares.shares && parseFloat(inputShares) >= 0
                ? 
                <div style={{ marginLeft: '10px' }}>Sell {inputShares} shares for a {getChange() > 0 ? "profit" : "loss"} of 
                    {getChange() > 0 
                    ?
                    " $" + (getChange() * 1).toFixed(2)
                    : " $" + (getChange() * -1).toFixed(2)
                    }
                </div>
                : 
                    parseFloat(inputShares) <= shares.shares && parseFloat(inputShares) >= 0
                    ?
                    ""
                    :
                    <div style={{marginLeft: '10px'}}>
                        Enter a valid number of shares
                    </div>
                }
                <button 
                    onClick={handleSell}
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginTop: '10px', // Added margin to space out the button
                        marginRight: '15px'
                    }}>
                    Sell
                </button>
            </div>
        </div>
    );
};

export default SellPopup;