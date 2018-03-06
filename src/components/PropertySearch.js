import React, {Component} from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Waypoint from 'react-waypoint'
import queryString from 'query-string'

import Loading from './Loading'
import {Results, ResultCard} from './Results'
import ResultsHeader from './ResultsHeader'
import SearchBox from './SearchBox'

import Map from './Map'

class PropertySearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      loading: false,
      searchStarted: false,
      results: [],
      totalPages: 0,
      totalResults: 0,
      currentPage: 1,
      minPrice: null,
      maxPrice: 'max',
      minBed: null,
      maxBed: 'max',
      mode: 'grid',
      mapCenter: {
        lat: 0,
        lng: 0
      },
      selectedProperty: null
    }
    this.onChange = (address) => this.setState({address})
    this.incrementPage = this.incrementPage.bind(this)
    this.decrementPage = this.decrementPage.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
  }

  resetComponent() {
    this.setState({
      address: '',
      loading: false,
      searchStarted: false,
      results: [],
      totalPages: 0,
      totalResults: 0,
      currentPage: 1,
      minPrice: null,
      maxPrice: 'max',
      minBed: null,
      maxBed: 'max',
      mode: 'grid',
      mapCenter: {
        lat: 0,
        lng: 0
      },
      selectedProperty: null
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault && event.preventDefault()
    if (this.state.address.trim() === '') {
      this.resetComponent()
      return
    }
    this.setState({results: []})
    this._getResults()
  }

  changePage(amount) {
    const newPage = this.state.currentPage + amount
    if (newPage > this.state.totalPages || newPage < 1) {
      return
    }
    this.setState({currentPage: newPage})
    this._getResults()
  }

  incrementPage() {
    console.log('increment')
    this._changePage(1)
  }

  decrementPage() {
    this._changePage(-1)
  }

  handleSelectChange(e) {
    console.log(e)
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value === 0
        ? null
        : e.currentTarget.value
    })
    this.setState({results: []})
    this._getResults()
  }

  changeMode(e) {
    this.setState({mode: e.currentTarget.name})
  }

  _getResults() {
    this.setState({loading: true, searchStarted: true});
    const query = {
      action: 'search_listings',
      encoding: 'json',
      country: 'uk',
      place_name: this.state.address,
      ...this.state.currentPage && {
        page: this.state.currentPage
      },
      ...this.state.minPrice && {
        price_min: this.state.minPrice
      },
      ...this.state.maxPrice && {
        price_max: this.state.maxPrice
      },
      ...this.state.minBed && {
        bedroom_min: this.state.minBed
      },
      ...this.state.maxBed && {
        bedroom_max: this.state.maxBed
      }
    }
    console.log(this.state, query)
    const url = `http://localhost:8080/api.nestoria.co.uk/api?${queryString.stringify(query)}`
    console.log(url)
    fetch(url).then((resp) => resp.json()).then((data) => {
      const {
        listings: results,
        locations: [
          {
            center_lat: lat,
            center_long: lng
          }
        ],
        total_pages: totalPages,
        total_results: totalResults
      } = data.response
      this.setState({
        loading: false,
        results,
        totalPages,
        totalResults,
        mapCenter: {
          lng,
          lat
        }
      });
      console.log(lng, lat)
    });
  }

  handleMapClick(index) {
    this.setState({selectedProperty: this.state.results[index]})
  }

  render() {
    const hasStarted = this.state.searchStarted
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Where do you want to live?',
      ref: 'searchBox'
    }

    if (hasStarted) {
      return (<div>
        <ResultsHeader totalResults={this.state.totalResults} address={this.state.address} handleFormSubmit={this.handleFormSubmit} inputProps={inputProps} handleSelectChange={this.handleSelectChange} changeMode={this.changeMode}/>
        <ModeSwitch mapCenter={this.state.mapCenter} mode={this.state.mode} results={this.state.results} incrementPage={this.props.incrementPage} loading={this.state.loading} selectedProperty={this.state.selectedProperty} handleMapClick={this.handleMapClick}/>
      </div>)
    } else {
      return (<div className="skyline">
        <SearchBox handleFormSubmit={this.handleFormSubmit} inputProps={inputProps}/>
        <Loading loading={this.state.loading}/>
      </div>)
    }
  }
}

class ModeSwitch extends Component {
  render() {
    if (this.props.mode === 'grid') {
      return (<div>
        <Results results={this.props.results}/>
        <Waypoint onEnter={this.props.incrementPage}>
          <div className="load-more w-100 tc pa4">
            <Loading color="#000000" loading={this.props.loading}/>
          </div>
        </Waypoint>
      </div>)
    } else {
      if (this.props.selectedProperty) {
        return (<div class="flex">
          <div class="selectedProperty w-25-l w-50-m pt6">
            <ResultCard {...this.props.selectedProperty}/>
          </div>
          <div class="selectedProperty w-75-l w-50-m">
            <Map results={this.props.results} loading={this.props.loading} mapCenter={this.props.mapCenter} handleMapClick={this.props.handleMapClick}/>
          </div>
        </div>)
      } else {
        return <Map results={this.props.results} loading={this.props.loading} mapCenter={this.props.mapCenter} handleMapClick={this.props.handleMapClick}/>
      }
    }
  }
}

export default PropertySearch
