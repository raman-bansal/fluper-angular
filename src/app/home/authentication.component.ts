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

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility.service';
import { AccountService } from 'src/app/core/services/account.service';
import { LoginInterface } from 'src/app/core/http/model/authentication.interface';
import { environment } from 'src/environments/environment';

const ZERO = 48;
const NINE = 57;
const FIVE = 5;
const interval = 90;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit, AfterViewInit {
  inputParent: NodeListOf<HTMLElement>;

  emailId: string;
  showBtn = false;
  btnLoader = false;
  loader = false;
  regex = new RegExp(/^[0-9]/, 'g');
  timerOn = true;
  refreshInterval;

  constructor(
    private readonly utilityService: UtilityService,
    private readonly accountService: AccountService
  ) {
    this.emailId = this.utilityService.getEmailId();
    this.checkEmailId();
  }

  ngOnInit(): void { }




  pasteOtp(event: ClipboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    const pastedText = event.clipboardData.getData('text');
    for (let i = 0; i < Math.min(6, pastedText.length); i++) {
      if (pastedText[i].match(this.regex)) {
        this.inputParent[i]['value'] = pastedText[i];
        if (i < FIVE) {
          this.inputParent[i + 1].focus();
        }
      } else {
        return;
      }
    }

    this.checkValidity();
  }

  /**
   * getKey
   * @param event;
   * @returns void;
   */
  getKey(key: string, id: string) {
    if (key === 'Tab') {
      return;
    }

    const index = parseInt(id, 10) - 1;
    if (key === 'Backspace') {
      if (index !== 0) {
        this.inputParent[index]['value'] = null;
        this.inputParent[index - 1].focus();
      }
      return;
    }

    if (key.match(this.regex)) {
      this.inputParent[index]['value'] = key;
      if (index < FIVE) {
        this.inputParent[index + 1].focus();
      }
      this.checkValidity();
    }
    // else {
    //   const activeElem: Element = document.activeElement;
    //   if (!activeElem['value']) {
    //     this.inputParent[index]['value'] = '';
    //   }
    // }
  }

  checkValidity() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.inputParent.length; i++) {
      if (!this.inputParent[i]['value']) {
        return;
      }
    }
    this.loginWithOtp();
  }

  /**
   * ngAfterViewInit
   */
  ngAfterViewInit() {
    this.inputParent = document
      .getElementById('otp-field')
      .querySelectorAll('input');
    setTimeout(() => {
      this.inputParent[0].focus();
    }, FIVE);
    this.timer();
  }

  timer() {
    let remaining = interval;
    this.refreshInterval = setInterval(() => {
      let m = Math.floor(remaining / 60);
      let s = remaining % 60;
      let min = m < 10 ? '0' + m : m;
      let sec = s < 10 ? '0' + s : s;
      document.getElementById('timer').innerHTML = min + ' : ' + sec;
      if (remaining > 0) {
        remaining -= 1;
      } else {
        this.clearTimer();
        this.timerOn = false;
        this.showBtn = true;
      }
    }, 1000)
  }



  /**
   * checkEmailId
   * @returns void;
   */
  checkEmailId() {
    if (!this.emailId) {
      this.utilityService.navigateTo('/vwv/v1');
    }
  }

  /**
   * doSignUp
   * @returns void
   */
  loginWithOtp(): void {
    this.clearTimer();
    this.timerOn = false;
    this.loader = true;
    let otp = '';
    this.inputParent.forEach((element) => {
      otp += element['value'];
    });

    const paramObj = {
      strategy: 'OTP',
      sessionType: 'COOKIES',
    };
    const queryParams = this.utilityService.getObjToQueryParam(paramObj);
    const data = {
      username: this.utilityService.getEmailId(),
      otp,
    };
    this.accountService.login(queryParams, data).subscribe((res) => {
      this.loader = false;
      if (res && res.code === 'success') {
        // this.accountService.getPreference().subscribe((res) => {
        // if (res && res['code'] === 'success') {
        // if (this.utilityService.openShareUrl()) {
        //   return;
        // }
        // set
        setTimeout(() => {
          this.utilityService.checkCookie();
        }, 200);
        // this.utilityService.navigateTo('/workspace-list/v1');
        // }
        // })
      } else {
        this.showBtn = true;
        this.utilityService.apiError(res);
      }
    });
  }

  /**
   * resendOtp
   * @returns void;
   */
  resendOtp() {
    if (this.btnLoader) {
      return;
    }
    this.clearTimer();
    this.checkEmailId();
    this.btnLoader = true;
    const paramObj = {
      strategy: 'OTP',
      username: this.emailId,
    };
    const queryParams = this.utilityService.getObjToQueryParam(paramObj);
    this.accountService.sendVerifyEmail(queryParams).subscribe((res) => {
      this.btnLoader = false;
      if (res && res.code === 'success') {
        this.timerOn = true;
        this.timer();
        this.showBtn = false;
        this.inputParent.forEach((element) => {
          element['value'] = '';
        });
      } else {
        this.utilityService.apiError(res);
      }
    });
  }

  clearTimer() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}
