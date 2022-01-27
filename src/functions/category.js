import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

export const mapFirstTwoCategories = (categories) => {
  return (
    categories.slice(0, 2).map(category =>
      <Col as={Link} to={`/categories/${category.categoryId}`} className="smallspaceabove black thin nounderline categoryBox" key={category.categoryId}>
        <div md="auto" className="medlarge mr-auto spacebeneath">
          {category.categoryName}
        </div>
        <img src={category.imageUrl} alt="categoryImg" />
      </Col>
    )
  )
}

export const mapLastTwoCategories = (categories) => {
  return (
    categories.slice(2, 4).map(category =>
      <Col as={Link} to={`/categories/${category.categoryId}`} className="smallspaceabove black thin nounderline categoryBox" key={category.categoryId}>
        <div md="auto" className="medlarge mr-auto spacebeneath">
          {category.categoryName}
        </div>
        <img src={category.imageUrl} alt="categoryImg" />
      </Col>
    )
  )
}