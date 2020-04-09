import { GET_REVIEWS, GET_REVIEWS_SUCCESS } from '../constants';
import { fetchReviews } from '../../api';

const initialState = {
  reviews: [],
  isLoading: false,
};


export const getReviewsAction = () => (dispatch) => {
  dispatch({ type: GET_REVIEWS, isLoading: true });
  fetchReviews().then((res) => dispatch(
    { type: GET_REVIEWS_SUCCESS, reviews: res, isLoading: false },
  ));
};

export function reviewsReducer(state = initialState, action) {
  const { type, reviews, isLoading } = action;

  switch (type) {
    case (GET_REVIEWS): return (
      { ...state, isLoading }
    );
    case (GET_REVIEWS_SUCCESS): return (
      { ...state, reviews, isLoading }
    );
    default: return state;
  }
}
