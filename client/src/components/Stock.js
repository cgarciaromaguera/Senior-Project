// organize information in Stock component

// https://polygon.io/docs/stocks/get_v3_snapshot 
// login and click run query to see ticker data

// import React from 'react';
// const Stock = ({ stock }) => {
//     return (
//         <div className="stock">
//             <h4>{stock.ticker} Price: ${stock.session.price}</h4>
//         </div>
//     )
// }

//  export default Stock

const Stock = ({ stock }) => {
    const { ticker, name, session } = stock;
    const priceFixed = session?.price?.toFixed(2) ?? 'N/A';
    const changeFixed = session?.change?.toFixed(2) ?? 'N/A';
    const changePercentFixed = session?.change_percent?.toFixed(2) ?? 'N/A';
    const volumeString = session?.volume?.toLocaleString() ?? 'N/A';
    const isPositive = session?.change >= 0;

    const stockCardStyle = {
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
        width: '250px' // You can set a fixed width for the card
    };

    const priceStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        margin: '5px 0'
    };

    const changeStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: isPositive ? 'green' : 'red',
        display: 'flex',
        alignItems: 'center'
    };

    const triangleStyle = {
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: isPositive ? '10px solid green' : '10px solid red'
    };

    return (
        <div className="stock" style={stockCardStyle}>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{ticker}</span>
            <span>{name}</span>
            <span style={priceStyle}>${priceFixed}</span>
            <div style={changeStyle}>
                <div style={triangleStyle}></div>
                {changeFixed} ({changePercentFixed}%)
            </div>
            <span style={{ fontSize: '12px', color: '#666' }}>Volume: {volumeString}</span>
            <button style={{
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '15px'
            }}>
                Buy
            </button>
        </div>
    );
};

export default Stock;