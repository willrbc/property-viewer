import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {compose, withProps} from "recompose"

import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const url = 'http://localhost:8080/api.nestoria.co.uk/api?action=search_listings&encoding=json&country=uk&place_name=Bath';

let results = {};
let mapCentre = {
  lat:0,
  lng:0
};

fetch(url).then((resp) => resp.json()).then(function(data) {
  results = data.response;
  mapCentre = {
    lat: parseFloat(results.locations[0].center_lat.toFixed(3)),
    lng: parseFloat(results.locations[0].center_long.toFixed(3))
  };
  console.log(results, mapCentre);
});

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={mapCentre}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
)

class Map extends Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <MyMapComponent />
    </div>);
  }
}

export default Map;
