import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as AuthActions from "./auth.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthResponseData } from "../auth.service";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCBo0hOkuRCM0kTXJCUqcTtKDLpFLldt30",
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate,
            });
          }),
          catchError((errorRes) => {
            let errorMessage = "An unknown error occurred!";
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.LogFail(errorMessage));
            }
            switch (errorRes.error.error.message) {
              case "EMAIL_EXISTS":
                errorMessage = "This email exists already";
                break;
              case "EMAIL_NOT_FOUND":
                errorMessage = "This email does not exist.";
                break;
              case "INVALID_PASSWORD":
                errorMessage = "This password is not correct.";
                break;
            }

            return of(new AuthActions.LogFail(errorMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
