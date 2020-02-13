import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ItemRecord.scss'
import {clearItemData} from "../../store/actions/table";

class ItemRecord extends Component {
  closePopupHandler = () => {
    this.props.clearItemData()
  }
  render() {
    const {itemData} = this.props
    return (
      <div className="popup-wrapper show">
        <div>
          <button
            className="close"
            onClick={this.closePopupHandler}
          >
            &times;
          </button>
          <div className='popup-body'>
            <h3>{itemData.firstName} {itemData.lastName}</h3>
            <p><strong>E-mail: </strong>{itemData.email}</p>
            <p><strong>Phone: </strong>{itemData.phone}</p>
            <p>
              <strong>Address: </strong>{itemData.address.zip}, {itemData.address.state}, {itemData.address.city}, {itemData.address.streetAddress}
            </p>
            <p><strong>Description: </strong></p>
            <p>{itemData.description}</p>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    itemData: state.table.itemData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearItemData: () => {dispatch(clearItemData())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRecord)