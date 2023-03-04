import { HttpClient } from "@angular/common/http";
import * as AuthActions from "./auth.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthResponseData } from "../auth.service";
import { catchError, map, switchMap } from "rxjs/operators";

export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCBo0hOkuRCM0kTXJCUqcTtKDLpFLldt30",
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          catchError((error) => {
            of();
          }),
          map((resData) => {
            of();
          })
        );
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
