import { deleteProduct } from "../api/cartAPI"

export const addProduct = (product, shoppingcart, isAuthenticated, handleShowAlreadyAdded, postProduct, user, props, handleShowLoginError) => {
  const cartItems = []
  shoppingcart.map(item => cartItems.push(item.product.productId))

  if (isAuthenticated) {
    // If the item already exists in the cart, show modal alert
    if (cartItems.includes(product.productId)) {
      handleShowAlreadyAdded()
    }
    // Otherwise add a new item to the cart
    else {
      postProduct(user.email, product)
        .then(
          window.setTimeout(() => {
            props.history.push('/cart')
          }, 1000
          ))
    }
  }
  else {
    handleShowLoginError()
  }
}

export const delProduct = (product, user) => {
  deleteProduct(user.email, product)
    .then(
      window.setTimeout(() => {
        window.location.reload(false)
      }, 1000
      ))
}

export const delAllProducts = (shoppingcart, user) => {
  shoppingcart.map(p => {
    return (
      deleteProduct(user.email, p.product)
        .then(
          window.setTimeout(() => {
            window.location.reload(false)
          }, 3000
          ))
    )
  })
}