import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { UtilityService } from '../services/utility.service';

@Injectable()
export class AppApiService implements HttpInterceptor {
  private authorization: string;
  private userName: string;

  constructor(
    private us: UtilityService
  ) {
    // this.authorization = retrieve from cookie
    // this.userName = retrieve from cookie
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      requestid: `${new Date().getTime()}${this.userName}`,
      // 'Content-Type': 'application/json',
    };

    // if (!this.authorization) {
    //   headers['Authorization'] = environment.paAuth;
    // }

    const clone = req.clone({
      setHeaders: headers,
      withCredentials: true,
    });

    return next
      .handle(clone)
    // .pipe(catchError((error) => {
    //   this.handleError(error)
    //   return of(error);
    // }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error ?? ''}`
      );
    }
    // Return an observable with a user-facing error message.
    this.us.hideLoader();
    if (error.hasOwnProperty('error') && error.error) {
      this.us.openSnackBar(error.error.message);
    }
    return throwError('Something bad happened; please try again later.');
  }
}

// Older Way
// errorHandler(response) {
//   switch (response.status) {
//     case ZERO: {
//       this.us.openSnackBar(
//         'Possibly! Your internet is down or Server is not responding.'
//       );
//       return of(null);
//     }
//     case FOUROONE: {
//       if (response.error.code !== 'auth-001') {
//         window.open(environment.account, '_self');
//       }
//       return of(response.error);
//     }
//     default: {
//       if (response.hasOwnProperty('error') && response.error) {
//         this.us.openSnackBar(response.error.message);
//         return of(response.error);
//       }
//     }
//   }
// }
