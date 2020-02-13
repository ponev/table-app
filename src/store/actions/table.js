import axios from 'axios';
import {
  CLEAR_ITEM_DATA,
  FETCH_DATA,
  FETCH_DATA_LOADING,
  FETCH_ERROR,
  FETCH_WORKING_DATA,
  SET_CURRENT_PAGE,
  SET_DATA_VOLUME,
  SET_ITEM_DATA,
  SET_ON_SEARCH,
  SET_PAGE_LIMIT,
  SET_SEARCH_STR,
  SET_SORTING
} from "./actionTypes";

export const fetchData = (dataVolume = 'small') => {
  return async dispatch => {
    dispatch(fetchDataLoading());

    let url = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
    if (dataVolume === 'big') {
      url = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
    }

    try {
      const response = await axios.get(url)

      dispatch(setDataList(response.data))
      dispatch(setWorkingDataList(response.data))
      dispatch(setDataVolume(dataVolume))
    }
    catch (error) {
      dispatch(fetchDataError(error.message))
    }
  }
}
export const fetchDataLoading = () => {
  return {
    type: FETCH_DATA_LOADING
  }
}
export const setDataList = (data) => {
  return {
    type: FETCH_DATA,
    data
  }
}
export const setWorkingDataList = (data) => {
  return {
    type: FETCH_WORKING_DATA,
    data
  }
}
export const fetchDataError = error =>{
  return {
    type: FETCH_ERROR,
    error
  }
}

export const setDataVolume = dataVolume => {
  return {
    type: SET_DATA_VOLUME,
    dataVolume
  }
}
export const setSorting = (data, sort) => {

  data.sort((a, b) =>
    sort.direction === 'desc' ?
      a[sort.sortBy] < b[sort.sortBy] ? 1 : b[sort.sortBy] < a[sort.sortBy] ? -1 : 0
      : a[sort.sortBy] > b[sort.sortBy] ? 1 : b[sort.sortBy] > a[sort.sortBy] ? -1 : 0
  )

  return {
    type: SET_SORTING,
    data,
    sortBy: sort.sortBy,
    direction: sort.direction
  }
}

export const setCurrentPage = currentPage => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  }
}
export const setPageLimit = limit => {
  return {
    type: SET_PAGE_LIMIT,
    limit
  }
}

export const setItemData = item => {
  return {
    type: SET_ITEM_DATA,
    item
  }
}
export const clearItemData = () => {
  return {
    type: CLEAR_ITEM_DATA
  }
}

export const setSearchStr = str => {
  return {
    type: SET_SEARCH_STR,
    searchStr: str
  }
}
export const onSearch = (data, searchStr) => {
  return (dispatch, getState) => {

    const dataConst = getState().table.data

    if (searchStr.length === 0) {
      dispatch(setDataListForSearch(dataConst))
    }

    const findData = dataConst.filter((item) => {
      return item.firstName.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 ||
        item.lastName.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 ||
        item.email.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 ||
        item.phone.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 ||
        item.id === +searchStr
    })
    console.log(findData);
    dispatch(setDataListForSearch(findData))

  }
}
export const setDataListForSearch = (data) => {
  return {
    type: SET_ON_SEARCH,
    data
  }
}