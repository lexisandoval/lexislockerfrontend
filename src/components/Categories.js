import React, { useContext } from 'react'
import { Container, Row } from 'react-bootstrap'
import Loader from 'react-loader-spinner'

import { mapFirstTwoCategories, mapLastTwoCategories } from '../functions/category'
import AppContext from '../contexts'

function Categories() {

  const { categories } = useContext(AppContext)

  return (
    <div className="mx-auto headerSpacing spacebeneath">
      <h2 className="large spaceabove spacebeneath">Categories</h2>
      {categories.length > 0 ?
        <>
          <Container className="catContainer">
            <Row>
              {mapFirstTwoCategories(categories)}
            </Row>
            <Row>
              {mapLastTwoCategories(categories)}
            </Row>
          </Container>
        </> :
        <>
          <div className="spaceabove spacebeneath" />
          <Loader type="TailSpin" color="black" height={40} width={40} />
        </>
      }
    </div>
  )
}

export default Categories