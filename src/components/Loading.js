import React, { Component } from 'react'

import { PropagateLoader } from 'react-spinners';


class Loading extends Component {
  render() {
    if (this.props.loading){
      return (
        <div className="loader">
          <PropagateLoader
            color={this.props.color ? this.props.color : '#ffffff'}
            loading={this.props.loading}
          />
        </div>
      )
    } else {
      return null
    }

  }
}

export default Loading
