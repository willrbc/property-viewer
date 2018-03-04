import _ from 'lodash'
import React, { Component } from 'react'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import {compose, withProps} from "recompose"

import {withScriptjs} from "react-google-maps"


const SearchComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places",
    loadingElement: <div style={{ height: `100%` }} />,
    }),
  withScriptjs,
)((props) =>
  <PlacesAutocomplete {...props} />
)


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
      placeholder: 'Enter city, town or street'
    }

    return (
      <div className="vh-100 dt w-100 ">
        <div className="dtc v-mid">
        <form className="search-box flex bg-animate hover-bg-blue dtc o-75 white ph3 ph4-l" onSubmit={this.handleFormSubmit}>
          <SearchComponent classNames={{
            root: 'w-75 mv4 f1 pv2 ba b--white white relative',
            input: 'input-reset ph2 bg-transparent white',
            autocompleteContainer: 'results-container absolute top-100 left-0 f3'
          }} inputProps={inputProps} />
          <button className="pa2 mv4 f1 brtb white bg-transparent b--white f1" type="submit">Go!</button>
        </form>
      </div>
    </div>
    )
  }
}


//ma4 f1 pa2 tc ba b--light-blue

//input-reset tc
export default SimpleForm
