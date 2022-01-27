import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import { IoIosHeart } from "react-icons/io"
import Loader from 'react-loader-spinner'

import { addProduct } from '../functions/product'
import { saveToLocalStorage, addFavoriteProduct, removeFavoriteProduct } from '../functions/favoriteProduct'
import { postProduct, getCart } from '../api/cartAPI'
import { getCategoryById } from '../api/categoryAPI'
import { getProductsByCategory } from '../api/productAPI'
import { scrollToTop } from '../functions/scroll'
import arrow from '../images/arrow.png'
import backCat from '../images/backCat.png'

function CategoryProducts(props) {

  const id = props.location.pathname.match(/\d+/)[0]

  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [shoppingcart, setShoppingcart] = useState([])
  const [favorites, setFavorites] = useState([])

  const { user, isAuthenticated } = useAuth0()
  const email = user ? user.email : ""

  const favoriteIds = favorites.map(p => p.productId)
  const favoriteUsers = favorites.map(p => p.nickname)

  useEffect(() => {
    getCategoryById(id)
      .then((response) => {
        setCategory(response)
      })

    getProductsByCategory(id)
      .then((response) => {
        setProducts(response)
      })

    getCart()
      .then((response) => {
        setShoppingcart(response.filter(item => item.user === email))
      })
  }, [id, email])

  useEffect(() => {
    const productFavorites = JSON.parse(
      localStorage.getItem('favorites')
    )

    if (productFavorites) {
      setFavorites(productFavorites.filter(item => item.email === email))
    }
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

  return (
    <div className="mx-auto headerSpacing">
      {products.length > 0 ?
        <>
          <h2 className="large spaceabove smallspacebeneath">{category.categoryName}</h2>
          <h4 className="spacebeneath">
            <Link className="blackLink nounderline" to="/categories">
              <img className="mx-auto" src={backCat} alt="backToCategories" />
            </Link>
          </h4>
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
          <Container className="prodContainer">
            <Row>
              {products.map(product =>
                <Col key={product.productId} className="smallspaceabove largespacebeneath ">
                  <div className="img__wrap mx-auto">
                    <img src={product.imageUrl} className="productImg" alt='product' />
                    <div className="img__description_layer">
                      <h5 className="thin">{product.brand} / {product.size}</h5>
                    </div>
                  </div>
                  <div className="thin medlarge">{product.productName}</div>
                  <div className="thin medium">${product.unitPrice.toFixed(2)}</div>
                  <div>
                    {favoriteIds.includes(product.productId) && favoriteUsers.includes(user.nickname) ?
                      <IoIosHeart
                        onClick={() => removeFavoriteProduct(product, favorites, isAuthenticated, setFavorites, saveToLocalStorage)}
                        className="heart"
                        style={{ color: '#ff78ac' }}
                      />
                      :
                      <IoIosHeart
                        onClick={() => addFavoriteProduct(product, user, favorites, isAuthenticated, setFavorites, saveToLocalStorage, handleShowLoginError)}
                        className="heartEmpty"
                        style={{ color: '#ffe1ec' }}
                      />}
                  </div>
                  <div>
                    <Button onClick={() => addProduct(product, shoppingcart, isAuthenticated, handleShowAlreadyAdded, postProduct, user, props, handleShowLoginError)} className="spaceabove addButton">Add To Cart</Button>
                  </div>
                </Col>
              )}
            </Row>
          </Container>
          <Button className="smallspaceabove spacebeneath arrowButton" onClick={() => scrollToTop()}>
            <img src={arrow} className="mx-auto arrowIcon" alt="arrow up icon from https://www.iconfinder.com/" />
          </Button>
        </> :
        <>
          <div className="spaceabove spacebeneath" />
          <Loader type="TailSpin" color="black" height={40} width={40} />
        </>}
    </div>
  )
}

export default CategoryProducts