import { useEffect, useState } from "react"
import axios from 'axios'

import Stock from '../components/Stock'

const Home = () => {
    const [tickers, setTickers] = useState(null) // each ticker is a stock

    useEffect(() => { // api call here
        let t = []
        let next_url = ""

        const fetchStocks = async () => {
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

            setTickers(t)
        }

        fetchStocks()
    }, [])

    return(
        <div className="home">
            <div className="tickers">
                {tickers && tickers.map((ticker) => (
                    <Stock key={ticker._id} ticker={ticker}/>
                ))}
            </div>
        </div>
    )
}

export default Home