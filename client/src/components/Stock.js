// organize information in Stock component

const Stock = ({ ticker }) => {
    return (
        <div className="stock">
            <h4>{ticker.ticker} Price: ${ticker.session.price}</h4>
        </div>
    )
}

export default Stock