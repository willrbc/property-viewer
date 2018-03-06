import React, {Component} from 'react'
import logo from './logo.svg'
import './App.scss'

import PropertySearch from './components/PropertySearch'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {searchTerm:''}
  }
  render() {
    return (
      <div className="App">

      <PropertySearch />
    </div>)
  }
}

export default App
