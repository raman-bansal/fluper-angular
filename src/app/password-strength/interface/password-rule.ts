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
 * _PRule
 */
export interface _PRule {
  at_least_x_chars: number;
  at_max_x_chars: number;
  at_least_one_lower_case_char: boolean;
  at_least_one_upper_case_char: boolean;
  at_least_one_digit_char: boolean;
  at_least_one_special_char: boolean;
}

/**
 * _Requirements
 *  at_least_x_chars
 * at_max_x_chars
 * at_least_one_lower_case_char
 * at_least_one_upper_case_char
 * at_least_one_digit_char
 * at_least_one_special_char
 * password
 */
export interface _Requirements {
  at_least_x_chars: boolean;
  at_max_x_chars: boolean;
  at_least_one_lower_case_char: boolean;
  at_least_one_upper_case_char: boolean;
  at_least_one_digit_char: boolean;
  at_least_one_special_char: boolean;
  password: string;
}
