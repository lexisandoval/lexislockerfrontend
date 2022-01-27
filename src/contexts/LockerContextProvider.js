import React, { useEffect, useState } from "react"
import PropTypes from "react"

import AppContext from "."
import { getProducts } from "../api/productAPI"
import { getCategories } from "../api/categoryAPI"

const LockerContextProvider = ({ children }) => {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const context = { products, categories }

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response)
      })

    getCategories()
      .then((response) => {
        setCategories(response)
      })
  }, [])

  return (
    <AppContext.Provider value={context} >
      {children}
    </AppContext.Provider>
  )
}

LockerContextProvider.propTypes = {
  children: PropTypes.Component
}

export default LockerContextProvider