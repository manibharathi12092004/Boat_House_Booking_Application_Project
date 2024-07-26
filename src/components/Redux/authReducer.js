import { SIGN_IN, SIGN_OUT, SIGN_UP } from './authActions';

const initialState = {
  isAuthenticated: false,
  email: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload.email,
        token: action.payload.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        email: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;