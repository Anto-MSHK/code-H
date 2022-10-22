export type userT = {
  firstName: string;
  lastName: string;
  role: "admin" | "tutor" | "user";
};

export type AuthStateT =
  | { user: { id: string; role: string }; isAuth: boolean }
  | undefined;
