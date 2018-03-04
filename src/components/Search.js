import React, { Component } from 'react'

class Loading extends Component {
  render() {
    if (this.props.loading){
      return (<div>LOADING...</div>)
    } else {
      return null
    }
  }
}

class Search extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.results)
    return this.props.loading !== nextProps.loading
  }

  render() {
    const props = this.props
    let Results = props.results.length > 0 ? props.results.map((result)=>{
      return (<div>{result}</div>)
    }) : ()=>{return null};
    return (
    <div>
      <div className={props.classes}>
        <input type='text' className={props.inputClasses} onChange={props.onSearchChange} placeholder={props.placeholder}/>
      </div>
      <Loading loading={props.loading}/>
      <Results/>
    </div>
    )
  }
}

export default Search
