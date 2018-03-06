import React, {Component} from 'react'
import numeral from 'numeral'

class ResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  bedrooms() {
    if (this.props.bedroom_number) {} else {}
  }
  render() {
    return (<article className="pointer relative justify-between ba tl dark-gray b--black-10 bg-white flex flex-column">
      <img src={this.props.img_url} className="db w-100" alt={this.props.title}/>
      <div className="flex-auto pa2 ph3-ns pb3-ns flex-auto justify-between flex flex-column">
        <div className="dt w-100 mt1">
          <h1 className="f5 f4-ns tl mv0">{this.props.title}</h1>
        </div>
        <p className="f6 lh-copy measure mt2 mid-gray">
          {this.props.summary}
        </p>
        <div className="flex justify-between">
          <h2 className="f5">{this.props.price_formatted}</h2>
          <h2 className="f5">
            {
              this.props.bedroom_number
                ? (<span>
                  <i className="fa fa-bed"></i>&nbsp;{this.props.bedroom_number}</span>)
                : null
            }
            {
              this.props.bathroom_number
                ? (<span>
                  <i className="fa fa-bath"></i>&nbsp;{this.props.bathroom_number}</span>)
                : null
            }
          </h2>
        </div>
      </div>
    </article>)
  }
}

class Results extends Component {
  render() {
    return (<div className="mh1 pt6 flex flex-wrap">
      {
        this.props.results.map((result, i) => (<div className="w-25-l w-50-m w-100-s flex pa3">
          <ResultCard key={i} {...result}/>
        </div>))
      }
    </div>)
  }
}

export {
  Results,
  ResultCard
}
