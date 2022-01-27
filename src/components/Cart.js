import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col, Modal } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react"
import StripeCheckout from 'react-stripe-checkout'

import { saveToLocalStorage, addProductToHistory } from '../functions/history'
import { getCartTotal } from '../functions/cart'
import { delProduct, delAllProducts } from '../functions/product'
import { getCart } from "../api/cartAPI"
import { scrollToTop } from '../functions/scroll'
import arrow from '../images/arrow.png'
import here from '../images/here.png'

function Cart() {

  const [showSuccess, setShowSuccess] = useState(false)
  const handleCloseSuccess = () => setShowSuccess(false)
  const handleShowSuccess = () => setShowSuccess(true)

  const { user } = useAuth0()
  const email = user ? user.email : ""

  const [history, setHistory] = useState([])

  const [shoppingcart, setShoppingcart] = useState([])

  useEffect(() => {
    getCart()
      .then((response) => {
        setShoppingcart(response.filter(item => item.user === email))
      })
  }, [email])

  useEffect(() => {
    const orderHistory = JSON.parse(
      localStorage.getItem('history')
    )

    if (orderHistory) {
      setHistory(orderHistory.filter(item => item.email === email))
    }
  }, [email])

  const handleToken = () => {
    delAllProducts(shoppingcart, user)

    shoppingcart.map(item => addProductToHistory(item.product, user, history, setHistory, saveToLocalStorage))

    handleShowSuccess()
  }

  return (
    <div className="mx-auto headerSpacing">
      <h2 className="large spaceabove">Cart</h2>
      {/* Conditional modal start */}
      <Modal id="successCheckout" show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <h4 className="thin my-auto">Thanks! Your order has been placed</h4>
        </Modal.Header>
      </Modal>
      {/* Conditional modal end */}
      {shoppingcart.length === 0 ?
        <>
          <h4 className="thin spaceabove">Your Cart Is Empty</h4>
          <h4 className="thin spacebeneath">Click
            <Link className="normal blackLink nounderline" to="/clothing">
              <img className="mx-auto" src={here} alt="hereImg" />
            </Link>to view all available products</h4>
        </> :
        <>
          <Container className="spaceabove spacebeneath cartContainer">
            {shoppingcart.map(p =>
              <Row className="smallspaceabove spacebeneath" key={p.product.productId}>
                <Col>
                  <img src={p.product.imageUrl} className="productImg" alt='product' />
                </Col>
                <Col className="my-auto">
                  <div className="thin medlarge">{p.product.productName}</div>
                  <div className="thin medium">Brand: {p.product.brand}</div>
                  <div className="thin medium">Size: {p.product.size}</div>
                  <div className="thin medium">${p.product.unitPrice.toFixed(2)}</div>
                  <div>
                    <Button onClick={() => delProduct(p.product, user)} className="spaceabove addButton">Remove</Button>
                  </div>
                </Col>
              </Row>
            )}
          </Container>
          <h4 className="thin spaceabove">Cart total: ${getCartTotal(shoppingcart)}</h4><br />
          <StripeCheckout
            stripeKey="pk_test_51JmjthLppSxEid2MwvjNefoS3FbYRawmLTQLw8vgFw22bbJsnuqSIkvm4lYHjRe01KYwyZkOgYqVaCKb8d8CakTi00LHNbt2JN"
            token={handleToken}
            shippingAddress
            billingAddress
            amount={getCartTotal(shoppingcart) * 100}
          /><br />
          {shoppingcart.length > 1 ?
            <Button className="spaceabove spacebeneath arrowButton" onClick={() => scrollToTop()}>
              <img src={arrow} className="mx-auto arrowIcon" alt="arrow up icon from https://www.iconfinder.com/" />
            </Button>
            : <><br/><br/></>
          }
        </>
      }
    </div>
  )
}

export default Cart