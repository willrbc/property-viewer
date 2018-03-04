import React, {Component} from 'react'
import logo from './logo.svg'
import './App.scss'

import SimpleForm from './components/SearchBox'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {searchTerm:''}
  }
  render() {
    return (
      <div className="App">

      <SimpleForm />
    </div>)
  }
}

export default App
