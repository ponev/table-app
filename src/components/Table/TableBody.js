import React, { Component } from 'react'
import './Table.scss'
import { connect } from 'react-redux'
import { setWorkingDataList, setItemData } from "../../store/actions/table";

class TableBody extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.workingData !== prevProps.workingData) {
      this.props.setWorkingDataList(this.props.workingData)
    }
  }

  showItemRecordHandler = item => {
    this.props.setItemData(item)
  }

  render() {

    const { workingData, pager } = this.props

    const line = workingData.slice((pager.currentPage - 1) * pager.pageLimit, pager.pageLimit * pager.currentPage)

    return (
      <tbody>
        {line.length > 0 && line.map(td=>(
          <tr
            key={td.id + td.lastName}
            onClick={()=> {this.showItemRecordHandler(td)}}
          >
            <td>{td.id}</td>
            <td>{td.firstName}</td>
            <td>{td.lastName}</td>
            <td>{td.email}</td>
            <td>{td.phone}</td>
          </tr>
        ))}
      </tbody>
      )
  }
}

const mapStateToProps = state => {
  return {
    workingData: state.table.workingData,
    pager: state.table.pager
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setWorkingDataList: (data) => dispatch(setWorkingDataList(data)),
    setItemData: item => dispatch(setItemData(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableBody)