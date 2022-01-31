export const getProducts = () => {
  return fetch("https://lexislockerproductservice.herokuapp.com/products")
    .then(response => response.json())
}

export const getProductsByCategory = (categoryId) => {
  return fetch(`https://lexislockerproductservice.herokuapp.com/categories/${categoryId}/products`)
    .then(response => response.json())
}