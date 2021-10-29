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

import { AbstractControl } from '@angular/forms';

export class PasswordStrengthValidator {

  /**
   * isUndefinedOrEmpty
   * if (!control || !control.value || control.value.length === 0) {
   *   return undefined;
   * }
   * @param control ;
   */
  isUndefinedOrEmpty(control: AbstractControl): any | undefined {}

  /**
   * validate
   * @param criteria:
   * @param regex:
   */
  validate(criteria: string, regex: RegExp): boolean {
    return regex.test(criteria);
  }

}
