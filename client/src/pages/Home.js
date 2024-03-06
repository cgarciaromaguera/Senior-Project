// import { useEffect, useState } from "react"
import axios from 'axios'

// const Home = () => {
//     const [tickers, setTickers] = useState([]) // each ticker is a stock
//     const [items, setItems] = useState(Array.from({length: 20}))

//     useEffect(() => {
//         if (tickers.length === 0) 
//             return

//         console.log("done loading")
//         console.log(tickers)


//     }, [])

//     useEffect(() => { // api call here
//         let t = []
//         let next_url = ""

//         const fetchStocks = async () => {
//             await axios.get("https://api.polygon.io/v3/snapshot?limit=250&apiKey=6uOX_KEZHdvzqvHxUnHo5GiKCyaQtAhP")
//                 .then((res) => {
//                     for (let i = 0; i < res.data.results.length; i++) {
//                         t.push(res.data.results[i])
//                     }
//                     next_url  = res.data.next_url
//             })

//             while (next_url) {
//                 await axios.get(next_url + "&apiKey=6uOX_KEZHdvzqvHxUnHo5GiKCyaQtAhP")
//                     .then((res) => {
//                         for (let i = 0; i < res.data.results.length; i++) {
//                             t.push(res.data.results[i])
//                         }
//                         next_url = res.data.next_url
//                     })
//             }

//             setTickers(t)
//         }

//         fetchStocks()
//         }, [])

//     return(
//         <div className="home">
//             <div className="tickers">
//                 {tickers && tickers.map((stock) => {
//                     return (<div>
//                                 {stock.name}
//                             </div>)
//                 })}
//             </div>
//         </div>
//     )
// }

// export default Home

import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Stock from '../components/Stock'


const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

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

            for (let i = 0; i < this.state.display.length; i++) {
                stockList.push(
                    <Stock stock={this.state.tickers[i]}/>
                )
            }

            this.setState({stocks: stockList}, () => {
                console.log(this.state.stocks)
            })
        })

    }, 1000)
  };

  render() {
    return (
      <div>
        {this.state.loading
        ? <h1>Loading...</h1>
        : <InfiniteScroll
            dataLength={this.state.stocks.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h1>Loading...</h1>}>
                {this.state.stocks}
            </InfiniteScroll>}
      </div>
    );
  }
}

export default Home