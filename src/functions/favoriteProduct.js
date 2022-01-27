import { Container, Col, Row, Button } from 'react-bootstrap'
import { addProduct } from '../functions/product'
import { postProduct } from '../api/cartAPI'
import { IoIosHeart } from "react-icons/io"

export const saveToLocalStorage = (items) => {
  localStorage.setItem('favorites', JSON.stringify(items))
}

export const addFavoriteProduct = (item, user, favorites, isAuthenticated, setFavorites, saveToLocalStorage, handleShowLoginError) => {
  const userFavorite = { ...item, ...user }
  const newFavoriteList = [...favorites, userFavorite]

  if (isAuthenticated) {
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }
  else {
    handleShowLoginError()
  }
}

export const removeFavoriteProduct = (item, favorites, isAuthenticated, setFavorites, saveToLocalStorage) => {
  const newFavoriteList = favorites.filter(
    (favorite) => favorite.productId !== item.productId
  )

  if (isAuthenticated) {
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }
}

export const renderFavorites = (favorites, user, shoppingcart, props, handleShowAlreadyAdded, handleShowLoginError, isAuthenticated, setFavorites, saveToLocalStorage) => {
  return (
    <>
      <h4 className="thin spaceabove spacebeneath">Favorites</h4>
      <Container className="favoritesContainer spacebeneath">
        {favorites.map(product =>
          <Row className="smallspaceabove spacebeneath" key={product.productId}>
            <Col>
              <img src={product.imageUrl} className="productImg" alt='product' />
            </Col>
            <Col className="my-auto">
              <div className="thin medlarge">{product.productName}</div>
              <div className="thin medium">Brand: {product.brand}</div>
              <div className="thin medium">Size: {product.size}</div>
              <div className="thin medium">${product.unitPrice.toFixed(2)}</div>
              <IoIosHeart
                onClick={() => removeFavoriteProduct(product, favorites, isAuthenticated, setFavorites, saveToLocalStorage)}
                style={{ color: '#ff78ac' }}
                className="heart"
              />
              <div md="auto">
                <Button onClick={() => addProduct(product, shoppingcart, isAuthenticated, handleShowAlreadyAdded, postProduct, user, props, handleShowLoginError)} className="spaceabove addButton">Add To Cart</Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}