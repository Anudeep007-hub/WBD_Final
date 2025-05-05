const initialState = {
    deals: [],
    loading: false,
    error: null,
  };
  
  const dealsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DEALS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_DEALS_SUCCESS':
        return { ...state, loading: false, deals: action.payload };
      case 'FETCH_DEALS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default dealsReducer;
  