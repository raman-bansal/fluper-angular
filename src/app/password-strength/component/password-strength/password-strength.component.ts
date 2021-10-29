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

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { _PRule, _Requirements } from '../../interface/password-rule';
import { PasswordStrengthInfoComponent } from '../password-strength-info/password-strength-info.component';
import { TestRequest } from '@angular/common/http/testing';

/**
 * MIN
 * MAX
 * RULEERRORMSG
 */
const MIN = 8;
const MAX = 1000;
const RULEERRORMSG = {
  worng_property_type: 'It seems like you haven\'t send correct rule! All fields are mandatory.',
  missing_property: 'It seems like you haven\'t send correct rule! All fields are mandatory.'
};
const NUM = 32;

/**
 * PasswordStrengthComponent
 */
@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  /**
   * passwordRule
   * validatedPassword
   * passStrengthInfoComponent
   * error
   * requirements
   * at_least_x_chars
   * at_max_x_chars
   * at_least_one_lower_case_char
   * at_least_one_upper_case_char
   * at_least_one_digit_char
   * at_least_one_special_char
   * password
   * hide
   */
  // tslint:disable-next-line: no-input-rename
  @Input('passwordRule') passwordRule: _PRule;
  @Output() validatedPassword = new EventEmitter<object>();
  // @Input('emailValid') set setEmail(result) {
  //   this.emailValidation = result;
  // }

  @ViewChild(PasswordStrengthInfoComponent, { static: false })
  passwordStrengthInfoComponent: any;
  emailValidation;
  error = false;

  validateObj = {
    passwordCheck: false,
    password: ''
  };
  requirments: _Requirements = {
    at_least_x_chars: false,
    at_max_x_chars: false,
    at_least_one_lower_case_char: false,
    at_least_one_upper_case_char: false,
    at_least_one_digit_char: false,
    at_least_one_special_char: false,
    password: ''
  };

  hide = true;

  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.checkValidityAndUpdate(this.passwordRule);
  }

  /**
   *
   * @param msg
   * return void
   */

  alertAndStop(msg: string) {
    alert(msg);
    this.error = true;
    return null;
  }

  stopKey(event: KeyboardEvent | any) {
    if (event.keyCode === NUM) {
      event.preventDefault();
      return;
    }
  }

  /**
   *
   * @param passwordRule
   * return void
   */
  checkValidityAndUpdate(passwordRule: _PRule): void {
    if (
      !this.passwordRule.hasOwnProperty('at_least_x_chars') ||
      !this.passwordRule.hasOwnProperty('at_max_x_chars') ||
      !this.passwordRule.hasOwnProperty('at_least_one_lower_case_char')
    ) {
      return this.alertAndStop(RULEERRORMSG.missing_property);
    }

    if (
      !this.passwordRule.hasOwnProperty('at_least_one_upper_case_char') ||
      !this.passwordRule.hasOwnProperty('at_least_one_digit_char') ||
      !this.passwordRule.hasOwnProperty('at_least_one_special_char')
    ) {
      return this.alertAndStop(RULEERRORMSG.missing_property);
    }

    if (
      typeof this.passwordRule.at_least_x_chars !== 'number' ||
      typeof this.passwordRule.at_max_x_chars !== 'number' ||
      typeof this.passwordRule.at_least_one_lower_case_char !== 'boolean'
    ) {
      return this.alertAndStop(RULEERRORMSG.worng_property_type);
    }

    if (
      typeof this.passwordRule.at_least_one_upper_case_char !== 'boolean' ||
      typeof this.passwordRule.at_least_one_digit_char !== 'boolean' ||
      typeof this.passwordRule.at_least_one_special_char !== 'boolean'
    ) {
      return this.alertAndStop(RULEERRORMSG.worng_property_type);
    }

    if (this.passwordRule.at_least_x_chars < MIN) {
      this.passwordRule.at_least_x_chars = MIN;
    }
    if (this.passwordRule.at_max_x_chars > MAX) {
      this.passwordRule.at_max_x_chars = MAX;
    }
  }

  getValidationValues(passwordCheck, password) {
    this.validateObj.passwordCheck = passwordCheck;
    this.validateObj.password = password;
    return this.validateObj;
  }

  public passwordValidityChange(requirments: _Requirements) {
    this.requirments = requirments;

    // debugger
    // To Run Change Detection on Child Component
    this.passwordStrengthInfoComponent.runChangeDetection();
    this.emitValue(requirments);
  }

  /**
   *
   * @param requirments
   * return void
   */
  emitValue(requirments: _Requirements): void {
    if (!requirments.at_least_x_chars || !requirments.at_max_x_chars) {
      this.validatedPassword.emit(this.getValidationValues(false, requirments.password));
      return;
    }

    const keys: string[] = [];
    for (const key in this.passwordRule) {
      if (!(key === 'at_least_x_chars' || key === 'at_max_x_chars')) {
        keys.push(key);
      }
    }

    for (let i = 0; i < keys.length; i++) {
      const k: string = String(keys[i]);

      if (this.passwordRule[k] && !requirments[k]) {

        this.validatedPassword.emit(this.getValidationValues(false, requirments.password));
        return;
      }
    }

    this.validatedPassword.emit(this.getValidationValues(true, requirments.password));
  }
}
