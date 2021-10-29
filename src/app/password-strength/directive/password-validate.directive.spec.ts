import { PasswordValidateDirective } from './password-validate.directive';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PasswordStrengthComponent } from '../component/password-strength/password-strength.component';
import { PasswordStrengthModule } from '../password-strength.module';
import { ElementRef } from '@angular/core';

fdescribe('Password Validate Directive', () => {

  let directive: PasswordValidateDirective;
  let component: PasswordStrengthComponent;
  let fixture: ComponentFixture<PasswordStrengthComponent>;

  const passwordRule = {
    at_least_x_chars: 8,
    at_max_x_chars: 30,
    at_least_one_lower_case_char: true,
    at_least_one_upper_case_char: true,
    at_least_one_digit_char: true,
    at_least_one_special_char: true,
  };

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        imports: [PasswordStrengthModule],
        declarations: [
          PasswordValidateDirective,
          //  PasswordStrengthComponent
        ]
      })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthComponent);
    component = fixture.componentInstance;
    directive = new PasswordValidateDirective(new ElementRef(null));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('test checkValue', () => {
    directive.passwordRule = passwordRule;
    expect(directive.criteria.at_max_x_chars).toBeFalse();
    expect(directive.criteria.at_least_x_chars).toBeFalse();
    expect(directive.criteria.at_least_one_digit_char).toBeFalse();
    expect(directive.criteria.at_least_one_lower_case_char).toBeFalse();
    expect(directive.criteria.at_least_one_special_char).toBeFalse();
    expect(directive.criteria.at_least_one_upper_case_char).toBeFalse();

    directive.checkValue('Decimal@');
    expect(directive.criteria.at_max_x_chars).toBeTrue();
    expect(directive.criteria.at_least_x_chars).toBeTrue();
    expect(directive.criteria.at_least_one_digit_char).toBeFalsy();
    expect(directive.criteria.at_least_one_lower_case_char).toBeTrue();
    expect(directive.criteria.at_least_one_special_char).toBeTrue();
    expect(directive.criteria.at_least_one_upper_case_char).toBeTrue();

    directive.checkValue('Decimal1@');
    expect(directive.criteria.at_max_x_chars).toBeTrue();
    expect(directive.criteria.at_least_x_chars).toBeTrue();
    expect(directive.criteria.at_least_one_digit_char).toBeTrue();
    expect(directive.criteria.at_least_one_lower_case_char).toBeTrue();
    expect(directive.criteria.at_least_one_special_char).toBeTrue();
    expect(directive.criteria.at_least_one_upper_case_char).toBeTrue();
  });
});

