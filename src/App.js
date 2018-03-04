import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import SearchComponent from './PlacesAutocomplete'


class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }
  handleFormSubmit = (event) => {
    event.preventDefault()
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Enter location here'
    }


    return (
      <form onSubmit={this.handleFormSubmit}>
        <SearchComponent inputProps={inputProps} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}


class App extends Component {
  render() {
    return (<div className="App">
      <SimpleForm />
    </div>)
  }
}

export default App;
