import React from "react"
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";
import Stock from '../components/Stock'
import logo from './logo2.png';
import './Home.css'
import { Link } from 'react-router-dom'
import { MoneyContext } from "../context/MoneyContext";

class Home extends React.Component {
  state = {
    tickers: [],
    searched: [],
    search: "",
    searching: false,
    lastSearch: "",
    display: [],
    stocks: [],
    loading: true,
    items: Array.from({ length: 20 }),
    hasMore: true,
    money: this.context.money
  };
  itemsPerPage = 500
  static contextType = MoneyContext
  
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
    
    this.setState({tickers: t, searched: t}, () => {
        this.setState({loading: false})
        this.fetchMoreData()
    })
  }

  setMoney(spent) {
    this.setState({money: this.state.money - spent})
  }

  fetchMoreData = () => {
    let stockList = []

    setTimeout(() => {
        this.setState({
            display: [...this.state.display, ...this.state.tickers.slice(this.state.display.length, this.state.display.length + this.itemsPerPage)]
        }, () => {
           
            for (let i = 0; i < this.state.display.length; i++) {
              stockList.push(<Stock stock={this.state.tickers[i]} changeMoney={this.setMoney.bind(this)}/>)
            }

            this.setState({stocks: stockList})
        })

    }, 1000)
  };

  fetchMoreSearched = () => {
    let list = []

    setTimeout(() => {
      this.setState({
        display: [...this.state.display, ...this.state.searched.slice(this.state.display.length, this.state.display.length + this.itemsPerPage)]
      }, () => {
        for (let i = 0; i < this.state.display.length; i++) {
          list.push(<Stock stock={this.state.searched[i]} changeMoney={this.setMoney.bind(this)}/>)
        }

        this.setState({stocks: list})
      })
    })
  }

  handleChange = async (e) => {
    this.setState({search: e.target.value})
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.setState({ display: [], stocks: [] })

    const filtered = this.state.tickers.filter((stock) => stock.name.toLowerCase().includes(this.state.search?.toLowerCase()))

    this.setState({ searched: filtered, searching: true, lastSearch: this.state.search}, () => {
      this.fetchMoreSearched()
    })
  }

  handleReset = (e) => {
    e.preventDefault()
    this.setState({ display: [], stocks: [], searched: [], searching: false, lastSearch: "", search: ""}, () => {
      this.fetchMoreData()
    })

  }

  render() {
    return (
        <div className='home'>
          <div className='header'>
            <img src={logo} alt="Logo" className="logo" /> {/* Include the logo */} 
            <Link to="/account"style={{ textDecoration: 'none' }}>
              <h10 className="account"> Account </h10>
            </Link>
          </div>

          <div className="navigationBar">
            <Link to="/" style={{color: "black"}}>
              <h1 className='home-header'>Home</h1>
            </Link>
            <Link to="/mock-trading" style={{ textDecoration: 'none' }}>
              <h1 className='mocktrade-header'>Your Stocks</h1>
            </Link>
            <Link to="/learn" style={{ textDecoration: 'none' }}>
              <h1 className='learn-header'>Learn</h1>
            </Link>
          </div>

          <form style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
              <label htmlFor="stock">Search for Stocks:</label>
              <input type="text" id="stock" value={this.state.search} onChange={this.handleChange.bind(this)}/>
              <button style={{
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    fontSize: '13px',                    
                    marginTop: 'auto'
                }}
              type="search" disabled={this.state.loading} onClick={this.handleSearch.bind(this)}>Search</button>
              <button style={{
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 15px',
                cursor: 'pointer',
                fontSize: '13px',           
                marginTop: 'auto'
              }}
              type="reset" disabled={this.state.loading} onClick={this.handleReset.bind(this)}>Reset</button>   
          </form>

          <div>        
            <p style={{marginLeft: '10px', fontSize: '18px'}}><strong>Your Balance:</strong> ${this.state.money}</p>
              
            {this.state.searching
            ? this.state.loading
              ? <p style={{textAlign: 'center', fontSize: '24px'}}>Loading stocks...</p>
              : <div>
                Searching for: "{this.state.lastSearch}"
                  <InfiniteScroll
                    dataLength={this.state.stocks.length}
                    next={this.fetchMoreSearched}
                    hasMore={this.state.stocks.length < this.state.searched.length}
                    loader={<p style={{textAlign: 'center', fontSize: '24px'}}>Loading stocks...</p>}
                    height={700}>
                      <div className="stock-grid">
                        {this.state.stocks.map((row) => {
                          return (
                            <div>
                              {row}
                            </div>
                          )
                        })}
                      </div>
                  </InfiniteScroll>
                </div>
            : this.state.loading
              ? <p style={{textAlign: 'center', fontSize: '24px'}}>Loading stocks...</p>
              : <InfiniteScroll
                  dataLength={this.state.stocks.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.stocks.length < this.state.tickers.length}
                  loader={<p style={{textAlign: 'center', fontSize: '24px'}}>Loading stocks...</p>}
                  height={700}>
                    <div className="stock-grid">
                      {this.state.stocks.map((row) => {
                        return (
                          <div>
                            {row}
                          </div>
                        )
                      })}
                    </div>
                </InfiniteScroll>
            }
          </div>
        </div>
    );
  }
}

export default Home