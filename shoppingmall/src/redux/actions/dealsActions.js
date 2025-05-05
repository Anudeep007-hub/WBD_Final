export const fetchDeals = () => async (dispatch) => {
    dispatch({ type: 'FETCH_DEALS_REQUEST' });
  
    try {
      const response = await fetch(`${process.env.API_URL}/api/deals`);
      const data = await response.json();
      dispatch({ type: 'FETCH_DEALS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_DEALS_FAILURE', payload: error.message });
    }
  };
  