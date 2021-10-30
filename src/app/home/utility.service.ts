/*
 * Decimal, Account Management App.
 * Copyright (C) 2008-2013 Decimal
 * mailto:contact AT decimal DOT co DOT in
 *
 * Account is Decimal software; you can not redistribute it.
 * any versions of the License.
 * License is private by the Decimal Foundation;
 *
 * Inc., 8th Floor, Tower – D, Pioneer Urban Square, Golf Course Ext Rd,
 * Sector 62, Gurugram, Haryana 122102
 */

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

const COOKIETIMEOUT = '60 * 60 * 24 * 1000';
const USER_ID = 'USER_ID';
const USERNAME = 'USERNAME';
const ACCOUNT_ID = 'ACCOUNT_ID';
const DEFAULT_ACCOUNT_ID = 'DEFAULT_ACCOUNT_ID';
const DEFAULT_WORKSPACE = 'DEFAULT_WORKSPACE';
const ACCESS_LEVEL = 'ACCESS_LEVEL';
const DEFAULT_ACCOUNT_HIERARCHY = 'DEFAULT_ACCOUNT_HIERARCHY';
const APP_ID = 'APP_ID';
const APP_TYPE = 'APP_TYPE';
const APP_HIERARCHY = 'APP_HIERARCHY';
const APP_NAME = 'APP_NAME';
/**
 * CookieService
 * cookietimeout
 * environment variables
 */

/**
 * UtilityService
 */

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public isLeftMenuOpen = false;
  public isRightMenuOpen = false;
  workspaceData: Subject<object> = new BehaviorSubject<object>(null);
  loader: Subject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Initilizes UtilityService
   * @param snackBar;
   * @returns void;
   */
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private location: Location
  ) { }

  /**
   * setCookie
   * @param name:
   * @param value:
   * @returns void
   * setcookie
   * environment values
   * domain
   */
  setCookie(name: string, value: string): void {
    document.cookie = `${name}=${value};domain=${environment.cookieDomain};path=/;samesite=lax;secure: true;max-age: ${COOKIETIMEOUT}`;
  }

  /**
   * getCookie
   * getcookie
   * environmentvalues
   * domain
   */
  getCookie(name: string): string | null {
    name = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');
    const matches = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return matches ? matches[2] : null;
  }

  /**
   * remove
   * @param name;
   * @returns void
   * remove cookie
   */
  remove(name: string): void {
    document.cookie = `${name}=;domain=${environment.cookieDomain};path=/;samesite=lax;secure: true;max-age:-1`;
  }

  getAppId() {
    return this.getCookie(APP_ID);
  }

  getAppType() {
    return this.getCookie(APP_TYPE);
  }

  getUserId() {
    return this.getCookie(USER_ID);
  }

  getWorkspaceId() {
    let accessLevel = this.getCookie(ACCESS_LEVEL);
    let workspaceId = accessLevel.split(":")[1].split('_')[0];
    return workspaceId;
  }

  getUserName() {
    return this.getCookie(USERNAME);
  }

  getAppName() {
    return this.getCookie(APP_NAME);
  }

  getAccountId() {
    return this.getCookie(ACCOUNT_ID);
  }

  getDefaultAccountId() {
    return this.getCookie(DEFAULT_ACCOUNT_ID);
  }

  getAppHierarchy() {
    return this.getCookie(APP_HIERARCHY);
  }

  getDefaultWorkspace() {
    return this.getCookie(DEFAULT_WORKSPACE);
  }

  getWorkspaceAccessLevel() {
    return this.getCookie(ACCESS_LEVEL);
  }

  getDefaultAccountHierarchy() {
    return this.getCookie(DEFAULT_ACCOUNT_HIERARCHY);
  } u

  showLoader() {
    this.loader.next(true);
  }

  hideLoader(interval?) {
    setTimeout(() => {
      this.loader.next(false);
    }, interval || 400)
  }

  /**
   * openSnackBar
   * @param message;
   * @param actionClass;
   */
  openSnackBar(message: string, actionClass?: string) {
    const actionBtn = 'Close';
    if (!message) {
      this.showSnackBar('Message is not defined', actionBtn);
    } else {
      this.showSnackBar(message, actionBtn, actionClass);
    }
  }

  getQueryParamsToObj(parameter: string) {
    const data = {};
    const params = parameter.split('&');
    params.forEach((ele) => {
      const value = ele.split('=');
      data[value[0]] = value[1];
    });
    return data;
  }

  getUrlQueryParam() {
    const url = window.location.href;
    if (url.includes('?')) {
      const param = url.split('?')[1];
      const queryParam = this.getQueryParamsToObj(param);
      return queryParam;
    }
    return;
  }

  getObjToQueryParam(obj): string {
    const arr = [];
    // tslint:disable-next-line: forin
    for (const key in obj) {
      const value = `${key}=${obj[key]}`;
      arr.push(value);
    }
    let queryString;
    if (arr.length > 1) {
      queryString = arr.toString().replace(/,/g, '&');
    } else {
      queryString = arr.toString();
    }
    return queryString;
  }

  getCodeValue(code, list) {
    return list.find((ele) => ele.code === code).value;
  }

  getValueCode(value, list) {
    return list.find((ele) => ele.value === value).code;
  }

  goBack() {
    this.location.back();
  }
  setWorkspaceData(data) {
    this.workspaceData.next(data);
  }

  /**
   * showSnackBar
   * @param msg:
   * @param action:
   * @param classRequired:
   * @returns void
   */
  showSnackBar(msg: string, action, classRequired?): void {
    const WAITTIME = 4000;
    this.snackBar.open(msg, action, {
      duration: WAITTIME,
      panelClass: [classRequired],
    });
  }

  /**
   * navigateTo
   * @param path;
   * @param queryParam;
   */
  navigateTo(path: string, queryParam?: object) {
    this.router.navigate([path], {
      queryParams: queryParam,
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  /**
   * apiError
   * @param res;
   */
  apiError(error) {
    if (error.code !== 'auth-001') {
      window.open(environment.signinUrl, '_self');
      return;
    }
    if (error && error.message) {
      this.openSnackBar(error.message);
    } else {
      this.openSnackBar(
        'Something went wrong! please check your connection or try again later'
      );
    }
  }
}
