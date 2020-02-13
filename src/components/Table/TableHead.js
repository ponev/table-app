import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setSorting} from "../../store/actions/table"

class TableHead extends Component {

  setSortingHandler = (field, direction) => {
    const sort = {
      sortBy: field,
      direction
    }
    this.props.setSorting(this.props.workingData, sort)
  }

  render() {
    const {settings: {tableHead, sort}} = this.props

    const head = tableHead && tableHead.map(th => {

      const ASC = <span className="direction">&#9650;</span>
      const DESC = <span className="direction">&#9660;</span>
      const style = {'width': th.cssWidth}
      const directionArrow = th.sortByField === sort.sortBy ? (
        sort.direction === 'asc' ? ASC : DESC
      ) : null;
      const direction = th.sortByField !== sort.sortBy ? 'asc' : sort.direction === 'asc' ? 'desc' : 'asc'

      return (
        <th
          className="th-item"
          key={th.sortByField}
          onClick={() => {this.setSortingHandler(th.sortByField, direction)}}
          style={style}
        >
          {th.column}&nbsp;{directionArrow}
        </th>
      )

    })

    return (
      <thead className="thead-light">
        <tr>
          {head}
        </tr>
      </thead>
    )
  }
}

const mapStateToProps = state => {
  return {
    workingData: state.table.workingData,
    settings: state.table.settings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSorting: (data, sort) => dispatch(setSorting(data, sort))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableHead)