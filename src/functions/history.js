import { Container, Col, Row } from 'react-bootstrap'

export const saveToLocalStorage = (items) => {
  localStorage.setItem('history', JSON.stringify(items))
}

export const addProductToHistory = (item, user, history, setHistory, saveToLocalStorage) => {
  const userOrder = { ...item, ...user }
  const newHistoryList = [...history, userOrder]

  setHistory(newHistoryList)
  saveToLocalStorage(newHistoryList)
}

export const renderHistory = (history) => {
  return (
    <>
      <h4 className="thin spaceabove spacebeneath">Order History</h4>
      <Container className="favoritesContainer spacebeneath">
        {history.map(product =>
          <Row className="smallspaceabove spacebeneath" key={product.productId}>
            <Col>
              <img src={product.imageUrl} className="productImg" alt='product' />
            </Col>
            <Col className="my-auto">
              <div className="thin medlarge">{product.productName}</div>
              <div className="thin medium">Brand: {product.brand}</div>
              <div className="thin medium">Size: {product.size}</div>
              <div className="thin medium">${product.unitPrice.toFixed(2)}</div>

            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}