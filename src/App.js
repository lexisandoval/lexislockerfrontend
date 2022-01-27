import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './styles/App.css'
import NavBar from './components/NavBar'
import Categories from './components/Categories'
import CategoryProducts from './components/CategoryProducts'
import Products from './components/Products'
import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import Search from './components/Search'
import Account from './components/Account'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/categories' component={Categories} />
            <Route exact path='/categories/:categoryId' component={CategoryProducts} />
            <Route exact path='/clothing' component={Products} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/account' component={Account} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App