import axios from 'axios'
import { useMoneyContext } from './useMoneyContext'
import { useStocksContext } from './useStocksContext'

export const usePurchase = () => {
    const { dispatch: dispatchMoney } = useMoneyContext()
    const { dispatch: dispatchStocks } = useStocksContext()


    const purchase = async (_id, stock, amount, shares) => {
        axios.post('/api/user/purchase', { _id: _id, stock: stock, spent: amount, shares: shares })
            .then((res) => {
                let user = JSON.parse(localStorage.getItem('user'))
                user.Stocks = res.data.money
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('money', res.data.money)
                dispatchMoney({type: 'SET_MONEY', payload: res.data.money})

                // add stock to map
                user = JSON.parse(localStorage.getItem('user'))
                user.stocks = res.data.stocks
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('stocks', JSON.stringify(res.data.stocks))
                dispatchStocks({type: 'SET_STOCKS', payload: res.data.stocks})
                
            })
  }

  return { purchase }
}