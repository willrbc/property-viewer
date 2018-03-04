import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

import SearchBox from './components/SearchBox'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {searchTerm:''}
  }
  render() {
    return (<div className="App">
      <SearchBox />
    </div>)
  }
}

export default App
