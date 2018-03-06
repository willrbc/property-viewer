import React, {Component} from 'react';

import {compose, withProps} from "recompose"

import HomeIcon from './HomeIcon.js'

import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="vh-100 pt6" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={props.mapCenter}
    center={props.mapCenter}
    {...props}
  >
  {props.results.map((result, index)=>(
    <Marker
      icon={HomeIcon}
      key={index}
      position={{ lat: result.latitude, lng: result.longitude }}
      onClick={(e)=>{
        props.handleMapClick(index)
    }}>
    </Marker>
  ))}
  </GoogleMap>
)


export default Map;
