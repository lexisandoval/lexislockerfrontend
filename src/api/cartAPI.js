export const getCart = () => {
  return fetch("https://lexi-cart.ee-cognizantacademy.com/cart")
    .then(response => response.json())
}

export const postProduct = (user, product) => {
  let cartItem = {
    user,
    product,
  }
  return fetch('https://lexi-cart.ee-cognizantacademy.com/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItem)
  })

}

export const deleteProduct = (user, product) => {
  let cartItem = {
    user,
    product,
  }
  return fetch(`https://lexi-cart.ee-cognizantacademy.com/cart/${product.productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItem)
  })
}