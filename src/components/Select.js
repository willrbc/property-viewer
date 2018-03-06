import React, {Component} from 'react'
import numeral from 'numeral'
import 'numeral/locales/en-gb'


class Select extends React.Component {

  constructor(props) {
    super(props)
    // console.log(props)
    numeral.locale('en-gb')
    this._items = [(<option key={0} value={this.props.hasMax ? 'max' : 0}>{props.label}</option>)]
    for (let i = this.props.min; i < (props.max+1); i += props.step) {
      // console.log('prepping select', i, props.step)
      const label = numeral(i).format(props.format)
      this._items.push(<option key={i} value={i}>{label}</option>)
    }
  }

  render() {
    return (<select ref="minPrice" value={this.props.selected} onChange={this.props.onChange} id="types" className="bg-white" name={this.props.name}>
      {this._items}
    </select>)
  }
}

export default Select
