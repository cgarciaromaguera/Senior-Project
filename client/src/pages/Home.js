import React from "react"
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";
import Stock from '../components/Stock'
import logo from './logo.png';
import './Home.css'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  state = {
    tickers: [],
    display: [],
    stocks: [],
    loading: true,
    items: Array.from({ length: 20 }),
    hasMore: true
  };
  itemsPerPage = 500

  async componentDidMount() {
    let t = []
    let next_url = ""

    await axios.get("https://api.polygon.io/v3/snapshot?limit=250&apiKey=6uOX_KEZHdvzqvHxUnHo5GiKCyaQtAhP")
        .then((res) => {
            for (let i = 0; i < res.data.results.length; i++) {
                t.push(res.data.results[i])
            }
            next_url  = res.data.next_url
        })

    while (next_url) {
        await axios.get(next_url + "&apiKey=6uOX_KEZHdvzqvHxUnHo5GiKCyaQtAhP")
            .then((res) => {
                for (let i = 0; i < res.data.results.length; i++) {
                    t.push(res.data.results[i])
                }
                next_url = res.data.next_url
            })
    }
    
    this.setState({tickers: t}, () => {
        this.setState({loading: false})
        this.fetchMoreData()
    })
  }

  fetchMoreData = () => {
    let stockList = []

    setTimeout(() => {
        this.setState({
            display: [...this.state.display, ...this.state.tickers.slice(this.state.display.length, this.state.display.length + this.itemsPerPage)]
        }, () => {
            console.log(this.state.display)

            for (let i = 0; i < this.state.display.length; i += 6) {
              let stockRow = []
              for (let j = 0; j < 6; j++) {
                stockRow.push(         
                  <Stock stock={this.state.tickers[i + j]}/>
                )
              }
              stockList.push(stockRow)
            }

            this.setState({stocks: stockList}, () => {
                console.log(this.state.stocks)
            })
        })

    }, 1000)
  };

  render() {
    return (
        <div className='home'>
          <div className='header'>
            <img src={logo} alt="Logo" className="logo-home" /> {/* Include the logo */} 
            <Link to="/account"style={{ textDecoration: 'none' }}>
              <h10 className="account"> Account </h10>
            </Link>
          </div>

          <div className="navigationBar">
            <Link to="/" style={{color: "black"}}>
              <h1 className='home-header'>Home</h1>
            </Link>
            <Link to="/mock-trading"style={{ textDecoration: 'none' }}>
              <h1 className='mocktrade-header'>Your Stocks</h1>
            </Link>
              <h1 className='learn-header'>Learn</h1>
          </div>

          <form >
              <label htmlFor="stock">Search for Stocks:</label>
              <input type="text" id="stock" />
              <button type="search">Search</button>
          </form>

          <div>
            {this.state.loading
            ? <h1>Loading...</h1>
            : <InfiniteScroll
                dataLength={this.state.stocks.length}
                next={this.fetchMoreData}
                hasMore={true}
                loader={<h1>Loading...</h1>}
                height={600}>
                  <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto'}}>
                    {this.state.stocks.map((row) => {
                      return (
                        <div>
                          {row}
                        </div>
                      )
                    })}
                  </div>
                </InfiniteScroll>}
          </div>
        </div>
    );
  }
}

export default Home