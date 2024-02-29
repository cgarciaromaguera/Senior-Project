// organize information in Stock component

// https://polygon.io/docs/stocks/get_v3_snapshot 
// login and click run query to see ticker data

const Stock = ({ ticker }) => {
    return (
        <div className="stock">
            <h4>{ticker.ticker} Price: ${ticker.session.price}</h4>
        </div>
    )
}

export default Stock