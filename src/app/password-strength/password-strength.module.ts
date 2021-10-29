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

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrengthComponent } from './component/password-strength/password-strength.component';
import { PasswordStrengthInfoComponent } from './component/password-strength-info/password-strength-info.component';
import { PasswordValidateDirective } from './directive/password-validate.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialModule } from 'src/app/material/material.module';
/**
 * MatFormFieldModule
 * MatInputModule
 * MatCardModule
 * MatIconModule
 * MatButtonModule
 * FlexLayoutModule
 */
const modules = [
  CommonModule,
  MatFormFieldModule,
  MaterialModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  FlexLayoutModule
];

export { PasswordStrengthValidator } from './validator/password-strength-validator';

/**
 * PasswordStrengthModule
 */
@NgModule({
  declarations: [PasswordStrengthComponent, PasswordStrengthInfoComponent, PasswordValidateDirective],
  imports: [modules],
  exports: [PasswordStrengthComponent, PasswordStrengthInfoComponent]
})
export class PasswordStrengthModule { }
