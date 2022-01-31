export const getCategories = () => {
  return fetch("https://lexislockerproductservice.herokuapp.com/categories")
    .then(response => response.json())
}

export const getCategoryById = (categoryId) => {
  return fetch(`https://lexislockerproductservice.herokuapp.com/categories/${categoryId}`)
    .then(response => response.json())
}