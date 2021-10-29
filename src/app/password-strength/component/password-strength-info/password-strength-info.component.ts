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

import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _PRule, _Requirements } from '../../interface/password-rule';

/**
 *
 */
@Component({
  selector: 'app-password-strength-info',
  templateUrl: './password-strength-info.component.html',
  styleUrls: ['./password-strength-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordStrengthInfoComponent {
  @Input() requirments: _Requirements;
  @Input() passwordRule: _PRule;

  constructor(private readonly cd: ChangeDetectorRef) {
  }

  showInfo = true;

  /**
   * runChangeDetection
   */
  runChangeDetection(): void {
    this.showInfo = this.infoVisible(this.requirments);
    this.cd.detectChanges();
  }

  /**
   * infoVisible
   * @param requirments:_Requirements
   * @returns boolean
   */
   infoVisible(requirments: _Requirements): boolean {
    if (!requirments.at_least_x_chars || !requirments.at_max_x_chars) {
      return true;
    }

    const keys: string[] = Object.keys(this.passwordRule);

    for (let i = 0; i < keys.length; i++) {
      const k: string = String(keys[i]);
      if (this.passwordRule[k] && !requirments[k]) {
        return true;
      }
    }
    return false;
  }

}
