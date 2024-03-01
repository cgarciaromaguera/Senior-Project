import './Home.css'; 
import logo from './logo.png';


// data = {
//     name: "Apple",
//     closingprice: "500",
//     percentchange: "2.5%"
// }
const stockData = [
    { name: "Apple", closingprice: "500", percentchange: "2.5%" },
    { name: "Google", closingprice: "1500", percentchange: "1.8%" },
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
  
  const StockCard = ({ stock }) => (
    <div className="stock-card">
      <h2>{stock.name}</h2>
      <p>Closing Price: ${stock.closingprice}</p>
      <p>Percent Change: {stock.percentchange}</p>
    </div>
  );
const Home = () => {
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
            <div className="stock-cards-container">
                {stockData.map((stock, index) => (
                <StockCard key={index} stock={stock} />
                ))}
            </div>



        </div>
    )
  }  
  export default Home;