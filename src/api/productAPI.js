export const getProducts = () => {
  return fetch("https://lexi-product.ee-cognizantacademy.com/products")
    .then(response => response.json())
}

export const getProductsByCategory = (categoryId) => {
  return fetch(`https://lexi-product.ee-cognizantacademy.com/categories/${categoryId}/products`)
    .then(response => response.json())
}