import React, { useState } from 'react';
import './Home.css'; 
import logo from './logo.png';


// data = {
//     name: "Apple",
//     closingprice: "500",
//     percentchange: "2.5%"
// }
const stockData = [
    { name: "Apple", closingprice: "500", percentchange: "+2.5%" },
    { name: "Google", closingprice: "1500", percentchange: "-1.8%" },
    { name: "Apple2", closingprice: "500", percentchange: "2.5%" },
    { name: "Google2", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple3", closingprice: "500", percentchange: "2.5%" },
    { name: "Google3", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple4", closingprice: "500", percentchange: "2.5%" },
    { name: "Google4", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple3", closingprice: "500", percentchange: "2.5%" },
    { name: "Google3", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple3", closingprice: "500", percentchange: "2.5%" },
    { name: "Google3", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple10", closingprice: "500", percentchange: "2.5%" },
    { name: "2nd page of stocks", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple2", closingprice: "500", percentchange: "2.5%" },
    { name: "Google2", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple3", closingprice: "500", percentchange: "2.5%" },
    { name: "Google3", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple4", closingprice: "500", percentchange: "2.5%" },
    { name: "Google4", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple3", closingprice: "500", percentchange: "2.5%" },
    { name: "Google3", closingprice: "1500", percentchange: "1.8%" },
    { name: "Apple3", closingprice: "500", percentchange: "2.5%" },
    { name: "Google3", closingprice: "1500", percentchange: "1.8%" },
    // Add more stock data as needed
  ];
  
  const StockCard = ({ stock }) => {
    const { name, closingprice, percentchange } = stock;
    const isNegative = percentchange.includes('-');
    const percentChangeColor = isNegative ? 'negative' : 'positive';
  
    return (
      <div className="stock-card">
        <h2>{name}</h2>
        <p>Closing Price: ${closingprice}</p>
        <p>
          Percent Change:{" "}
          <span className={`percent-change ${percentChangeColor}`}>
            {percentchange}
          </span>
        </p>
      </div>
    );
  };

const Home = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const cardsPerPage = 12;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const visibleStockData = stockData.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );
    return (
         <div >
            <div className='header'>
            <img src={logo} alt="Logo" className="logo" /> {/* Include the logo */} 

            <h10 className="account"> Account </h10>
            </div>

            
            <div className="navigationBar">
                <h1 className='home-header'>Home</h1>
                <h1 className='mocktrade-header'>Your Stocks</h1>
                <h1 className='learn-header'>Learn</h1>
            </div>

            <form >
                <label htmlFor="stock">Search for Stocks:</label>
                <input type="text" id="stock" />
                <button type="search">Search</button>
            </form>

            {/* load in order of stocks with biggest percent change  10 per change only info needed is name, price, percent change */}
            <div className="stock-container">
              {/* load in order of stocks with the biggest percent change (12 per page); info needed is name, price, percent change */}
              {Array.from({ length: Math.ceil(visibleStockData.length / 6) }).map((_, rowIndex) => (
                <div key={rowIndex} className="stock-cards-row">
                  {visibleStockData.slice(rowIndex * 6, (rowIndex + 1) * 6).map((stock, index) => (
                    <StockCard key={index} stock={stock} />
                  ))}
                </div>
              ))}

              {/* Arrow button to load the next group of stock cards */}
              {currentPage > 0 && (
                <button className="back-button" onClick={handlePrevPage}>
                  Back
                </button>
              )}

              {/* Arrow button to load the next group of stock cards */}
              <button className="next-button" onClick={handleNextPage}>
                Next
              </button>
            </div>

        </div>
    )
  }  
  export default Home;