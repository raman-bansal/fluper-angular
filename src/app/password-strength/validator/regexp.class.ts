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

 /**
  * RegExpValidator
  * lowerCase
  * upperCase
  * digit
  * specialChar
  * using to check
  * all cases
  */
export const RegExpValidator = {
  lowerCase: RegExp(/[a-z]+/),
  upperCase: RegExp(/[A-Z]+/),
  digit: RegExp(/[0-9]+/),
  specialChar: RegExp(/[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]+/)
};
