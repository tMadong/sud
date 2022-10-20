import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../url";

export const AppContext = createContext({
  cartItems: [],
  userId: "",
  userName: null,
  addCartItem: (item) => {},
  decreaseCartItem: (id) => {},
  removeCartItem: (id) => {},
  setUser: (userId) => {},
  removeUser: () => {},
});

const defaultState = {
  cartItems: [],

  userId: localStorage.getItem("userId") || null,
  userName: localStorage.getItem("userName") || null,
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      break;
    case "DECREASE":
      break;
    case "REMOVE":
      break;
    case "SET_USER":
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userName", action.payload.userName);
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
      };
    case "REMOVE_USER":
      localStorage.clear();
      console.log("remove user");
      return {
        ...state,
        userId: "",
        userName: "",
      };
      break;
    case "CHECK_SAVED_USER":
      console.log("ckeck saveed user RUN");
      console.log(localStorage.getItem("userId"));

      return {
        ...state,
        userId: localStorage.getItem("userId"),
        userName: localStorage.getItem("userName"),
      };
  }
};

const ContextProvider = (props) => {
  const [state, dispatchAction] = useReducer(
    contextReducer,
    defaultState
  );

  const setUser = (userId, userName) => {
    dispatchAction({
      type: "SET_USER",
      payload: { userId, userName },
    });
  };
  const logout = () => {
    dispatchAction({ type: "REMOVE_USER" });
  };

  const checkSavedUser = () => {
    dispatchAction({ type: "CHECK_SAVED_USER" });
  };

  const appContext = {
    // cartItems: state.cartItems,
    userId: state.userId,
    userName: state.userName,
    // addCartItem: (item) => {},
    // decreaseCartItem: (id) => {},
    // removeCartItem: (id) => {},
    setUser: setUser,
    logout: logout,
    checkSavedUser: checkSavedUser,
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
