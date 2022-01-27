export const getCategories = () => {
  return fetch("https://lexi-product.ee-cognizantacademy.com/categories")
    .then(response => response.json())
}

export const getCategoryById = (categoryId) => {
  return fetch(`https://lexi-product.ee-cognizantacademy.com/categories/${categoryId}`)
    .then(response => response.json())
}