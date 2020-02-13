import React, { Component } from 'react'
import './Table.scss'
import Loader from '../Loader/Loader'
import { connect } from 'react-redux'
import { fetchData } from "../../store/actions/table"
import TableHead from "./TableHead"
import TableBody from "./TableBody";
import TablePager from "./TablePager";
import ItemRecord from "../ItemRecord/ItemRecord";
import Search from "../Search/Search";

class Table extends Component {

  componentDidMount() {
    this.props.fetchData()
  }

  render() {

    const { loading, error, itemRecord, workingData } = this.props

    return (
      loading ?
          <Loader />
      : !!error ? <div className="alert alert-danger">{error}</div>
        : <div>
            <Search />
            <hr />
            { workingData.length > 0 ?
              <>
                <table className="table table-hover table-sm">
                  <TableHead/>
                  <TableBody/>
                </table>
                <TablePager/>
              </>
              : <div className="alert alert-danger">Not found</div>
            }
            {itemRecord ? <ItemRecord/> : null}
          </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    loading: state.table.loading,
    error: state.table.error,
    itemRecord: state.table.itemRecord,
    workingData: state.table.workingData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: dataVolume => dispatch(fetchData(dataVolume))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)