export const getCartTotal = (shoppingcart) => {
  var total = 0
  shoppingcart.map(p => total = p.product.unitPrice + total)
  return total.toFixed(2)
}