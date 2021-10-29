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
  Directive,
  ElementRef,
  Input,
  Output,
  OnInit,
  EventEmitter,
  HostListener,
  OnDestroy
} from '@angular/core';
import { _PRule, _Requirements } from '../interface/password-rule';
import { RegExpValidator } from '../validator/regexp.class';
import { PasswordStrengthValidator } from '../validator/password-strength-validator';
import { Subscription, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
/**
 * WAITTIME
 */
const WAITTIME = 300;

/**
 * PasswordValidateDirective
 */

@Directive({
  selector: '[password-validate]'
})
export class PasswordValidateDirective extends PasswordStrengthValidator
  implements OnInit, OnDestroy {
  /**
   * @param keyUp;
   * @param subscription;
   * @param passwordRule;
   * @param passwordValidityChange;
   * @param criteria;
   * @param at_least_x_chars;
   */
  public keyUp = new Subject<KeyboardEvent>();
  private subscription: Subscription;

  @Input() passwordRule: _PRule;
  @Output() passwordValidityChange = new EventEmitter<_Requirements>();

  criteria: _Requirements = {
    at_least_x_chars: false,
    at_max_x_chars: false,
    at_least_one_lower_case_char: false,
    at_least_one_upper_case_char: false,
    at_least_one_digit_char: false,
    at_least_one_special_char: false,
    password: ''
  };

  /**
   * Initializes
   * @param el;
   */
  constructor(private readonly el: ElementRef) {
    super();
  }
  /**
   * subscription
   * event
   * keyUp
   * debounceTime
   * distinctUntilChanged()
   * return void
   */
  ngOnInit() {
    this.subscription = this.keyUp
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(WAITTIME),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.checkValue(value);
      });
  }


  checkValue(value) {
    if (this.passwordRule.at_least_x_chars) {
      this.criteria.at_least_x_chars = this._containAtLeastMinChars(value);
    }
    if (this.passwordRule.at_max_x_chars) {
      this.criteria.at_max_x_chars = this._containMaxChars(value);
    }
    if (this.passwordRule.at_least_one_lower_case_char) {
      this.criteria.at_least_one_lower_case_char = this._containAtLeastOneLowerCaseLetter(value);
    }
    if (this.passwordRule.at_least_one_upper_case_char) {
      this.criteria.at_least_one_upper_case_char = this._containAtLeastOneUpperCaseLetter(value);
    }
    if (this.passwordRule.at_least_one_digit_char) {
      this.criteria.at_least_one_digit_char = this._containAtLeastOneDigit(value);
    }
    if (this.passwordRule.at_least_one_special_char) {
      this.criteria.at_least_one_special_char = this._containAtLeastOneSpecialChar(value);
    }
    this.passwordValidityChange.emit(this.criteria);
  }

  /**
   *
   * @param password
   * return boolean
   */
  _containAtLeastMinChars(password: string): boolean {
    return password.length >= this.passwordRule.at_least_x_chars;
  }
  /**
   *
   * @param password
   * return boolean
   */
  _containMaxChars(password: string): boolean {
    return (password.length <= this.passwordRule.at_max_x_chars && password.length > 0);
  }

  /**
   *
   * @param password
   * return boolean
   */
  _containAtLeastOneLowerCaseLetter(password: string): boolean {
    return this.validate(password, RegExpValidator.lowerCase);
  }

  /**
   *
   * @param password
   * return boolean
   */
  _containAtLeastOneUpperCaseLetter(password: string): boolean {
    return this.validate(password, RegExpValidator.upperCase);
  }

  /**
   *
   * @param password
   * return boolean
   */
  _containAtLeastOneDigit(password: string): boolean {
    return this.validate(password, RegExpValidator.digit);
  }

  /**
   *
   * @param password
   * return boolean
   */
  _containAtLeastOneSpecialChar(password: string): boolean {
    return this.validate(password, RegExpValidator.specialChar);
  }

  @HostListener('keyup', ['$event']) onkeyup(event: KeyboardEvent | any) {
    this.criteria.password = event.target.value;
    this.keyUp.next(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
