import { AuthResponse } from "../../api/auth";

export enum AUTH {
  LOGIN = "AUTH/LOGIN",
  REGISTRATION = "AUTH/REGISTRATION",
  LOGOUT = "AUTH/LOGOUT",
}

export type loginAT = {
  type: string;
  token: AuthResponse;
};

export type registrationAT = {
  type: string;
  token: AuthResponse;
};

export type logoutAT = {
  type: string;
};

export const loginA = (token: AuthResponse): loginAT => ({
  type: AUTH.LOGIN,
  token,
});

export const registrationA = (token: AuthResponse): registrationAT => ({
  type: AUTH.REGISTRATION,
  token,
});

export const logoutA = (): logoutAT => ({
  type: AUTH.LOGOUT,
});

export type AuthAction = loginAT;
