import React, {Component} from 'react'

import SearchComponent from './SearchComponent'

export default class SearchBox extends Component {

  render() {

    const inputProps = this.props.inputProps

    const handleFormSubmit = this.props.handleFormSubmit


    return (
      <div className="vh-100 tc w-100">
        <form className="search-box relative tl flex bg-animate hover-bg-blue dtc white justify-center w-100 f1 pv4" onSubmit={handleFormSubmit}>
          <SearchComponent classNames={{
              root: 'w-75  pv2 ba b--white white relative',
              input: 'input-reset ph2 bg-transparent white',
              autocompleteContainer: 'results-container absolute top-100 left-0 f3'
            }} inputProps={inputProps} onEnterKeyDown={handleFormSubmit}/>
          <button className="pointer grow-large pa2  brtb blue bg-white b--white" type="submit">GO</button>
        </form>
      </div>)
  }
}
