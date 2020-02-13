import React, { Component } from 'react'
import { connect } from 'react-redux'
import {onSearch, setSearchStr} from "../../store/actions/table";

class Search extends Component {

  onSubmitSearchHandler = event => {
    event.preventDefault()
    this.props.onSearch(this.props.workingData, this.props.searchStr)
  }

  render() {

    const { searchStr } = this.props

    return (
      <form
        className="input-group mb-3"
        onSubmit={(e) => {this.onSubmitSearchHandler(e)}}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          onChange={(event) => {this.props.setSearchStr(event.target.value)}} value={searchStr}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary">Find</button>
        </div>
      </form>
    )
  }

}

const mapStateToProps = state => {
  return {
    workingData: state.table.workingData,
    searchStr: state.table.searchStr
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchStr: str => dispatch(setSearchStr(str)),
    onSearch: (data, searchStr) => dispatch(onSearch(data, searchStr))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)