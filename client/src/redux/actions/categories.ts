import axios from "axios";
import { Dispatch } from "redux";
import { IAction } from "../interfaces";
import { GET_CATEGORIES } from "../types";

export const getCategories = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      const response = await axios.get(`/api/categories`);
      return dispatch({
        type: GET_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_CATEGORIES,
        payload: error,
      });
    }
  };
};
