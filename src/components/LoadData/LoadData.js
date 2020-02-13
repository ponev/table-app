import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchData } from "../../store/actions/table";

class LoadData extends Component {

  loadDataHandler = () => {
    this.props.fetchData(this.props.dataVolume)
  }

  render() {

    const {dataVolume, settings} = this.props
    const btnClasses = ['btn', 'btn-outline-info']
    if (dataVolume === settings.dataVolume) {
      btnClasses.push('active')
    }

    return (
      <button
        className={btnClasses.join(' ')}
        onClick={this.loadDataHandler}
      >
        {this.props.label}
      </button>
    )
  }
}
const mapStateToProps = state => {
  return {
    settings: state.table.settings
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData: dataVolume => dispatch(fetchData(dataVolume))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadData)