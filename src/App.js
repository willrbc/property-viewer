import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

import Search from './components/Search'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {searchTerm:''}
  }
  render() {
    return (<div className="App">
      <Search />
    </div>)
  }
}

export default App
