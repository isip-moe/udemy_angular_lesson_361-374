import { Action } from "@ngrx/store";

export const LOGIN_START = "[Auth] Login Start";
export const AUTHENTICATE_FAIL = "[Auth] Login Fail";
export const AUTHENTICATE_SUCCESS = "[Auth] Login";
export const SIGNUP_START = "[Auth] Signup Start";
export const LOGOUT = "[Auth] Logout";

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  };
  constructor(payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }) {
    this.payload = payload;
  }
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart;
