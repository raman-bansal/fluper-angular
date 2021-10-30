import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  apiSubjectData: Subject<Object> = new BehaviorSubject<Object>(null);

  constructor(
    private readonly http: HttpClient,
    private us: UtilityService,
  ) { }

  setApiSubjectData(data) {
    this.apiSubjectData.next(data);
  }

  /**
   * This method will call server via http get and return response
   * by casting it into custom interface
   *
   * @param options  is an optional parameter of type object that contain
   *  1. headers:HttpHeaders
   *  2. reportProgress = true/false
   * @returns this method will return type I of interface
   */
  get<I>(endpoint, options?): Observable<HttpEvent<I>> {
    // options['withCredentials'] = true;
    // options['crossDomain'] = true;
    return this.http
      .get<I>(endpoint ? endpoint : environment.endPoint, options)
      .pipe(catchError((error) => {
        this.handleError(error);
        return of(error.error);
      }
      ));
  }


  /**
   * This method will call server via http post and return response
   * by casting it into custom interface
   *
   * @param options  is an optional parameter of type object that contain
   *  1. headers:HttpHeaders
   *  2. reportProgress = true/false
   * @param body is an optional parameter of type object
   * @returns this method will return type I of interface
   */
  post<I>(endPoint, body, options?): Observable<HttpEvent<I>> {
    // options['withCredentials'] = true;
    // options['crossDomain'] = true;
    return this.http
      .post<I>(endPoint ? endPoint : environment.endPoint, body, options)
      .pipe(catchError((error) => {
        this.handleError(error);
        return of(error.error);
      }
      ));
  }


  /**
   * This method will call server via http post and return response 
   * by casting it into custom interface
   *
   * @param options  is an optional parameter of type object that contain
   *  1. headers:HttpHeaders
   *  2. reportProgress = true/false
   * @param body is an optional parameter of type object
   * @returns this method will return type I of interface
   */
  put<I>(endPoint, body, options?): Observable<HttpEvent<I>> {
    // options['withCredentials'] = true;
    // options['crossDomain'] = true;
    return this.http
      .put<I>(endPoint ? endPoint : environment.endPoint, body, options)
      .pipe(catchError((error) => {
        this.handleError(error);
        return of(error.error);
      }
      ));
    // .pipe(catchError(error => this.errorHandler(error)));
  }

  delete<I>(endPoint, options?): Observable<HttpEvent<I>> {
    // options['withCredentials'] = true;
    // options['crossDomain'] = true;
    return this.http
      .delete<I>(endPoint ? endPoint : environment.endPoint, options)
      .pipe(catchError((error) => {
        this.handleError(error);
        return of(error.error);
      }
      ));
    // .pipe(catchError(error => this.errorHandler(error)));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status == 401) {
        if (error.hasOwnProperty('error') && error.error.code !== 'auth-001') {
          window.open(environment.signinUrl, '_self');
        }
      } else if (error.status == 403) {
        if (error.hasOwnProperty('error') && error.error.code === 'auth-020') {
          this.setApiSubjectData({ action: 'selection', message: error.error.message });
          return;
        }
      }
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
