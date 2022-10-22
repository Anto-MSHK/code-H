import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AUTH, AuthAction, loginA, registrationA } from "./actions";
import { AuthStateT } from "./types";
import { authApi } from "../../api/auth";

export const initialState: AuthStateT = {};

export const authReducer = (
  state: AuthStateT = initialState,
  action: AuthAction
) => {
  switch (action.type) {
    case AUTH.LOGIN:
      localStorage.setItem("token", action.token.accessToken);
      return {
        user: { id: action.token.user.id, role: action.token.user.role },
        isAuth: true,
      };
    case AUTH.REGISTRATION:
      localStorage.setItem("token", action.token.accessToken);
      return {
        user: { id: action.token.user.id, role: action.token.user.role },
        isAuth: true,
      };
    case AUTH.LOGOUT:
      localStorage.removeItem("token");
      return {};
    default:
      return state;
  }
};

export const login = (
  email: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      authApi.login(email, password).then((res) => {
        dispatch(loginA(res.data));
        resolve();
      });
    });
  };
};
export const registration = (
  email: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      authApi.registration(email, password).then((res) => {
        dispatch(registrationA(res.data));
        resolve();
      });
    });
  };
};
