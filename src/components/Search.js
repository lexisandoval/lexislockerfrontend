import React, { useState, useEffect, useContext } from 'react'
import { Container, Button, Col, Row, Modal } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react"
import { IoIosHeart } from "react-icons/io"

import { saveToLocalStorage, addFavoriteProduct, removeFavoriteProduct } from '../functions/favoriteProduct'
import { addProduct } from '../functions/product'
import { postProduct, getCart } from '../api/cartAPI'
import AppContext from '../contexts'

function Search(props) {

  const { products } = useContext(AppContext)

  const [shoppingcart, setShoppingcart] = useState([])
  const [search, setSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [favorites, setFavorites] = useState([])

  const favoriteIds = favorites.map(p => p.productId)
  const favoriteUsers = favorites.map(p => p.nickname)

  const { user, isAuthenticated } = useAuth0()
  const name = user ? user.nickname : ""
  const email = user ? user.email : ""

  useEffect(() => {
    const productFavorites = JSON.parse(
      localStorage.getItem('favorites')
    )

    if (productFavorites) {
      setFavorites(productFavorites.filter(item => item.nickname === name))
    }
  }, [name])

  useEffect(() => {
    getCart()
      .then((response) => {
        setShoppingcart(response.filter(item => item.user === email))
      })

    const filtered = products.filter((product) =>
      ((product.productName).toLowerCase()).includes(search.toLowerCase()) ||
      ((product.category.categoryName).toLowerCase()).includes(search.toLowerCase()) ||
      ((product.brand).toLowerCase()).includes(search.toLowerCase())
    )

    setFilteredProducts(filtered)
  }, [email, products, search])

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

  return (
    <div className="mx-auto headerSpacing">
      <h2 className="large spaceabove smallspacebeneath">Product Search</h2>
      <Container className="spaceabove spacebeneath">
        <form id="searchForm">
          <div className="form-group">
            <input type="text" data-testid="txtSearch" name="queryValue" className="form-control medium thin" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type to search..." />
          </div>
        </form>
      </Container>
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
      <Container className="searchContainer spacebeneath">
        {filteredProducts.length < products.length ?
          filteredProducts.map(product =>
            <Row className="smallspaceabove spacebeneath">
              <Col>
                <img src={product.imageUrl} className="productImg" alt='product' />
              </Col>
              <Col className="my-auto">
                <div className="thin medlarge">{product.productName}</div>
                <div className="thin medium">Brand: {product.brand}</div>
                <div className="thin medium">Size: {product.size}</div>
                <div className="thin medium">${product.unitPrice.toFixed(2)}</div>
                <div>
                  {favoriteIds.includes(product.productId) && favoriteUsers.includes(user.nickname) ?
                    <IoIosHeart
                      onClick={() => removeFavoriteProduct(product, favorites, isAuthenticated, setFavorites, saveToLocalStorage)}
                      className="heart"
                      style={{ color: '#ff78ac' }}
                    /> :
                    <IoIosHeart
                      onClick={() => addFavoriteProduct(product, user, favorites, isAuthenticated, setFavorites, saveToLocalStorage, handleShowLoginError)}
                      className="heartEmpty"
                      style={{ color: '#ffe1ec' }}
                    />
                  }
                </div>
                <div md="auto">
                  <Button onClick={() => addProduct(product, shoppingcart, isAuthenticated, handleShowAlreadyAdded, postProduct, user, props, handleShowLoginError)} className="spaceabove addButton">Add To Cart</Button>
                </div>
              </Col>
            </Row>
          ) : null
        }
      </Container>
    </div >
  )
}

export default Search