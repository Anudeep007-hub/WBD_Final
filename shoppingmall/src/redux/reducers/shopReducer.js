const initialState = {
    shops: [],
    expandedShopId: null,
    loading: false,
    error: null,
  };
  
  const shopsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SHOPS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_SHOPS_SUCCESS':
        return { ...state, loading: false, shops: action.payload };
      case 'FETCH_SHOPS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'TOGGLE_SHOP_DETAILS':
        return {
          ...state,
          expandedShopId:
            state.expandedShopId === action.payload ? null : action.payload,
        };
      default:
        return state;
    }
  };
  
  export default shopsReducer;
  