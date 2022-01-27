import React, { useState, useEffect } from "react"
import { Container, Modal } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react"

import { renderFavorites } from '../functions/favoriteProduct'
import { renderHistory } from '../functions/history'
import { saveToLocalStorage } from '../functions/favoriteProduct'
import { getCart } from '../api/cartAPI'

function Account(props) {

  const { user, isAuthenticated } = useAuth0()
  const name = user ? user.nickname : ""
  const email = user ? user.email : ""

  const [shoppingcart, setShoppingcart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    const productFavorites = JSON.parse(
      localStorage.getItem('favorites')
    )

    if (productFavorites) {
      productFavorites.reverse()
      setFavorites(productFavorites.filter(item => item.nickname === name))
    }

    const orderHistory = JSON.parse(
      localStorage.getItem('history')
    )

    if (orderHistory) {
      orderHistory.reverse()
      setHistory(orderHistory.filter(item => item.nickname === name))
    }
  }, [name])

  useEffect(() => {
    getCart()
      .then((response) => {
        setShoppingcart(response.filter(item => item.user === email))
      })
  }, [email])

  // For conditional login error modal
  const [showLoginError, setShowLoginError] = useState(false)
  const handleCloseLoginError = () => setShowLoginError(false)
  const handleShowLoginError = () => {
    setShowLoginError(true)

    window.setTimeout(() => {
      handleCloseLoginError()
    }, 3000)
  }

  // For conditional already added error modal
  const [showAlreadyAdded, setShowAlreadyAdded] = useState(false)
  const handleCloseAlreadyAdded = () => setShowAlreadyAdded(false)
  const handleShowAlreadyAdded = () => {
    setShowAlreadyAdded(true)

    window.setTimeout(() => {
      handleCloseAlreadyAdded()
    }, 3000)
  }

  if (isAuthenticated) {
    return (
      <Container className="homeCont headerSpacing smallspacebeneath">
        <h4 className="thin spaceabove">Welcome back, {user.name}!</h4>
        <img className="spaceabove profImg" src={user.picture} alt={user.name} />
        {/* Conditional modals start */}
        <Modal show={showAlreadyAdded} onHide={handleCloseAlreadyAdded}>
          <Modal.Header closeButton>
            <h4 className="thin my-auto">This product is already in your cart</h4>
          </Modal.Header>
        </Modal>
        <Modal id="loginError" show={showLoginError} onHide={handleCloseLoginError}>
          <Modal.Header closeButton>
            <h4 className="thin my-auto">Oops, you need to be logged in first</h4>
          </Modal.Header>
        </Modal>
        {/* Conditional modals end */}

        {favorites.length > 0 ? renderFavorites(favorites, user, shoppingcart, props, handleShowAlreadyAdded, handleShowLoginError, isAuthenticated, setFavorites, saveToLocalStorage) : null}

        {history.length > 0 ? renderHistory(history) : null}
      </Container>
    )
  }
  else {
    return (
      <Container className="homeCont headerSpacing smallspacebeneath">
        <h4 className="thin spaceabove">Sorry, you need to be logged in to view this page</h4>
      </Container>
    )
  }
}

export default Account