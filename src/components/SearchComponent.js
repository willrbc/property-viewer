import React, {Component} from 'react'

import PlacesAutocomplete from 'react-places-autocomplete'
import {compose, withProps} from "recompose"
import {withScriptjs} from "react-google-maps"


const SearchComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC0P-DRUE9BKaD-bqqxrC7Wt7fRaCMf7Hk&v=3.exp&libraries=places",
    loadingElement: <div style={{ height: `100%` }} />,
    options : {
      // types: [''],
      componentRestrictions: {country: "uk"}
    }

  }),
  withScriptjs,
  )((props) =>
  <PlacesAutocomplete {...props} />
)

export default SearchComponent
