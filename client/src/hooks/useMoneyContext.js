import { MoneyContext } from "../context/MoneyContext"
import { useContext } from "react"

export const useMoneyContext = () => {
  const context = useContext(MoneyContext)

  if(!context) {
    throw Error('useMoneyContext must be used inside a MoneyContextProvider')
  }

  return context
}