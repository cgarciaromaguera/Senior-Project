import React, { useEffect, useState } from "react";
import axios from 'axios'

import Stock from '../components/Stock'
const Home = () => {
    const [tickers, setTickers] = useState(null);

    useEffect(() => {
        let t = [];
        let next_url = "";

        const fetchStocks = async () => {
            try {
                const response = await axios.get("https://api.polygon.io/v3/snapshot?limit=250&apiKey=6uOX_KEZHdvzqvHxUnHo5GiKCyaQtAhP");
                t = [...response.data.results];
                next_url = response.data.next_url;

                while (next_url) {
                    const nextPageResponse = await axios.get(next_url + "&apiKey=6uOX_KEZHdvzqvHxUnHo5GiKCyaQtAhP");
                    t = [...t, ...nextPageResponse.data.results];
                    next_url = nextPageResponse.data.next_url;
                }

                setTickers(t);
            } catch (error) {
                console.error("Error fetching stocks: ", error);
                // You could set an error state and display it in the UI as well
            }
        };

        fetchStocks();
    }, []);
// const Home = () => {
//     const [tickers, setTickers] = useState(null)

//     useEffect(() => {
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
//     }, [])

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