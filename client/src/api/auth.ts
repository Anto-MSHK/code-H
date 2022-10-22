import { AxiosResponse } from "axios";
import { $api } from "../http";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; role: string };
}

export const authApi = {
  login: function async(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("auth/login", { email, password });
  },

  registration: function async(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("auth/register", { email, password });
  },

  logout: function async(): Promise<void> {
    return $api.post("/logout");
  },
};
