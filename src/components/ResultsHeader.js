import React, {Component} from 'react'
import SearchComponent from './SearchComponent'
import Select from './Select'

export default class ResultsHeader extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    const inputProps = this.props.inputProps

    const handleFormSubmit = this.props.handleFormSubmit

    return (<header className="z-1 fixed w-100">
      <form className="search-box relative tl flex bg-animate hover-bg-blue bg-blue-90 dtc white justify-center f3 pv3 ph5" onSubmit={handleFormSubmit}>
        <SearchComponent classNames={{
            root: 'w-75  pv2 ba b--white white relative',
            input: 'input-reset ph2 bg-transparent white',
            autocompleteContainer: 'results-container absolute top-100 left-0 f3'
          }} inputProps={inputProps} onEnterKeyDown={handleFormSubmit}/>
        <button className="pointer grow-large pa2  brtb blue bg-white b--white" type="submit">UPDATE</button>
      </form>
      <div className="w-100 bg-white-90 bg-animate hover-bg-white ph-6">
        <nav className="flex justify-between items-center">
          <div className="black flex items-center pa3" href="">
            {this.props.totalResults}&nbsp;properties for sale in '{this.props.address}'
          </div>
          <div>
            <Select label="Min price" min={100000} max={10000000} step={100000} format="$0,0" selected={this.props.minPrice} onChange={this.props.handleSelectChange} name="minPrice"/>
            <span className="mh2">
              to
            </span>
            <Select label="Max price" min={100000} max={10000000} step={100000} format="$0,0" selected={this.props.maxPrice} onChange={this.props.handleSelectChange} name="maxPrice"/>
          </div>
          <div>
            <Select label="Min beds" min={1} max={15} step={1} format="0" selected={this.props.minBedrooms} onChange={this.props.handleSelectChange} name="minBed"/>
            <span className="mh2">
              to
            </span>
            <Select label="Max beds" min={2} max={20} step={1} format="0" selected={this.props.maxBedrooms} onChange={this.props.handleSelectChange} name="maxBed"/>
          </div>
          <div className="flex-grow pa3 flex items-center">
            <a onClick={this.props.changeMode} name="grid" className={`f6 link black b dib mr3 mr4-ns ${this.props.mode==='grid' ? 'dim' : ''}`} href="#0">
              <i className="fa fa-list mr1"></i>
              Grid View</a>
            <a onClick={this.props.changeMode} name="map" className={`f6 link dib black b  ${this.props.mode==='grid' ? 'dim' : ''}`} href="#0">
              <i className="fa fa-map  mr1"></i>
              Map View</a>
          </div>
        </nav>

      </div>
    </header>)
  }
}
