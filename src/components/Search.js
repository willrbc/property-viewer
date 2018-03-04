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

class Results extends Component {
  render() {
    if (this.props.results.length > 0){
      console.log('rendering results')
      return (
        <ul>
          {this.props.results.map((result)=>{
            <li>{result}</li>
          })}
        </ul>
      )
    } else {
      return null
    }
  }
}

class Search extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.results)
    return true
    return this.props.loading !== nextProps.loading
  }

  render() {
    const props = this.props
    return (
    <div>
      <div className={props.classes}>
        <input type='text' className={props.inputClasses} onChange={props.onSearchChange} placeholder={props.placeholder}/>
      </div>
      {/* <Loading loading={props.loading}/> */}
      <Results results={props.results}/>
    </div>
    )
  }
}

export default Search
