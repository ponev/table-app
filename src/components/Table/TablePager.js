import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { setCurrentPage, setPageLimit } from "../../store/actions/table";

class TablePager extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.pager.pageLimit !== prevProps.pager.pageLimit) {
      this.props.setCurrentPage(1)
    }
  }

  printPages = (currentPage, countPages, rangeNum) => {
    const
      left = currentPage - rangeNum,
      right = currentPage + rangeNum + 1,
      range = [],
      rangeWithDots = []

    for (let i = 1; i <= countPages; i++) {
      if ((i === 1) || (i === countPages) || (i >= left && i < right)) {
        range.push(i);
      }
    }

    let l = null
    for (let i of range) {

      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(
            <li className="page-item" key={`page-${(i - 1)}`}>
              <Link
                to={`/`}
                className="page-link"
                onClick={() => {
                  this.props.setCurrentPage(i - 1)
                }}
              >
                {(i - 1)}
              </Link>
            </li>
          )
        } else if (i - l !== 1) {
          rangeWithDots.push(
            <li className="page-item disabled" key={`page-dots${Math.random()*100}`}>
              <span className="page-link">...</span>
            </li>
          )
        }
      }
      l = i

      if (currentPage === i) {
        rangeWithDots.push(
          <li className="page-item active" key={`page-${i}`}>
            <span className="page-link">
              {i}
            </span>
          </li>
        )
      }
      else {
        rangeWithDots.push(
          <li className="page-item" key={`page-${i}`}>
            <Link
              to={`/`}
              className="page-link"
              onClick={() => {
                this.props.setCurrentPage(i)
              }}
            >
              {i}
            </Link>
          </li>
        )
      }
    }


    const prevPage = currentPage === 1 ? (
      <li className="page-item disabled" key={`prev-page`}>
        <span className="page-link">Prev</span>
      </li>
    ) : (
      <li className="page-item" key={`prev-page`}>
        <Link
          to={`/`}
          className="page-link"
          onClick={()=>{this.props.setCurrentPage(currentPage - 1)}}
        >
          Prev
        </Link>
      </li>
    )

    const nextPage = currentPage === countPages ? (
      <li className="page-item disabled" key={`next-page`}>
        <span className="page-link">Next</span>
      </li>
    ) : (
      <li className="page-item" key={`next-page`}>
        <Link
          to={`/`}
          className="page-link"
          onClick={()=>{this.props.setCurrentPage(currentPage + 1)}}
        >
          Next
        </Link>
      </li>
    )

    return [prevPage, ...rangeWithDots, nextPage]
  }

  onPageHandler = (e) => {
    this.props.setPageLimit(+e.target.value);
  }

  render() {
    const { pager } = this.props

    const pages = this.printPages(pager.currentPage, pager.countPages, pager.range)

    const limits = pager.limits.map(l => <option key={`select${l}`} value={l}>{l}</option>)

    return (
      <div className="row">
        <div className="col-1">
          <select
            className="form-control form-control-sm"
            defaultValue={pager.pageLimit}
            onChange={this.onPageHandler}
          >
            {limits}
          </select>
        </div>
        <div className="col-11">
          <ul className="pagination pagination-sm justify-content-end">
            {pages}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pager: state.table.pager
  }
}

const mapDispathToProps = dispatch => {
  return {
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
    setPageLimit: limit => dispatch(setPageLimit(limit))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(TablePager)