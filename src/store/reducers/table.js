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
} from "../actions/actionTypes"

const initialState = {
  error: null,
  loading: false,
  data: [],
  workingData: [],

  settings: {
    tableHead: [
      {column: 'Id', sortByField: 'id', cssWidth: '10%'},
      {column: 'First Name', sortByField: 'firstName', cssWidth: '25%'},
      {column: 'Last Name', sortByField: 'lastName', cssWidth: null},
      {column: 'E-mail', sortByField: 'email', cssWidth: '25%'},
      {column: 'Phone', sortByField: 'phone', cssWidth: '15%'}
    ],
    dataVolume: 'small',
    sort: {
      sortBy: null,
      direction: null
    }
  },

  pager: {
    currentPage: 1,
    pageLimit: 10,
    countPages: null,
    range: 2,
    limits: [10, 25, 50]
  },

  itemRecord: false,
  itemData: {},

  searchStr: '',
  onSearch: false
}

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_LOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_DATA:
      return {
        ...state,
        data: action.data,
      }
    case FETCH_WORKING_DATA:
      return {
        ...state,
        loading: false,
        workingData: action.data,
        pager: {
          ...state.pager,
          countPages: Math.ceil(action.data.length / state.pager.pageLimit)
        }
      }
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case SET_DATA_VOLUME:
      return {
        ...state,
        settings: {
          ...state.settings,
          dataVolume: action.dataVolume
        }
      }
    case SET_SORTING:
      return {
        ...state,
        workingData: [...action.data],
        settings: {
          ...state.settings,
          sort: {
            sortBy: action.sortBy,
            direction: action.direction
          }
        }
      }

    case SET_CURRENT_PAGE:
      return {
        ...state,
        pager: {
          ...state.pager,
          currentPage: action.currentPage
        }
      }
    case SET_PAGE_LIMIT:
      return {
        ...state,
        pager: {
          ...state.pager,
          pageLimit: action.limit,
          countPages: Math.ceil(state.workingData.length / action.limit)
        }
      }

    case SET_ITEM_DATA:
      return {
        ...state,
        itemRecord: true,
        itemData: action.item
      }
    case CLEAR_ITEM_DATA:
      return {
        ...state,
        itemRecord: false,
        itemData: {}
      }

    case SET_SEARCH_STR:

      return {
        ...state,
        searchStr: action.searchStr
      }
    case SET_ON_SEARCH:
      const onSearch = state.searchStr.length > 0 ? true : false
      return {
        ...state,
        workingData: action.data,
        pager: {
          ...state.pager,
          countPages: Math.ceil(action.data.length / state.pager.pageLimit)
        },
        onSearch
      }
    default:
      return state;
  }
}