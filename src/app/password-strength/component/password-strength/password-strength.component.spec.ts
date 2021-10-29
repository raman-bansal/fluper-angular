import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PasswordStrengthComponent } from './password-strength.component';
import { PasswordStrengthModule } from '../../password-strength.module';
import { PasswordValidateDirective } from '../../directive/password-validate.directive';

fdescribe('PasswordStrengthComponent', () => {
  let component: PasswordStrengthComponent;
  let fixture: ComponentFixture<PasswordStrengthComponent>;

  // tslint:disable-next-line: deprecation
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordStrengthComponent, PasswordValidateDirective],
      imports: [PasswordStrengthModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthComponent);
    component = fixture.componentInstance;
    component.passwordRule = {
      at_least_x_chars: 8,
      at_max_x_chars: 30,
      at_least_one_lower_case_char: true,
      at_least_one_upper_case_char: true,
      at_least_one_digit_char: true,
      at_least_one_special_char: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('password strength method', () => {
    // tslint:disable-next-line: one-variable-per-declaration
    let validateObj, passwordCheck, password, requirments, data;
    beforeEach(() => {
      requirments = {
        at_least_one_digit_char: true,
        at_least_one_lower_case_char: true,
        at_least_one_special_char: true,
        at_least_one_upper_case_char: true,
        at_least_x_chars: true,
        at_max_x_chars: true,
        password: "Raman@123"
      }
      passwordCheck = true;
      password = 'Raman@123';
      validateObj = {
        passwordCheck,
        password
      };
    });

    it('get validation values', () => {
      expect(component.getValidationValues(passwordCheck, password)).toEqual(validateObj);
    });

    it('password validity method', () => {
      component.passwordValidityChange(requirments);
      expect(component.requirments).toEqual(requirments);
    });

    it('emit value method', () => {
      component.emitValue(requirments);
      expect(component.validateObj).toEqual(validateObj);
    });
  });

  describe('password strength method with error', () => {
    // tslint:disable-next-line: one-variable-per-declaration
    let validateObj, passwordCheck, password, requirments;
    beforeEach(() => {
      requirments = {
        at_least_one_digit_char: true,
        at_least_one_lower_case_char: true,
        at_least_one_special_char: true,
        at_least_one_upper_case_char: true,
        at_least_x_chars: false,
        at_max_x_chars: false,
        password: "Ram"
      }
      passwordCheck = false;
      password = 'Ram';
      validateObj = {
        passwordCheck,
        password
      };
    });
    it('emit value method', () => {
      component.emitValue(requirments);
      expect(component.validateObj).toEqual(validateObj);
    });

    it('alert and stop method', () => {
      component.alertAndStop('error');
      expect(component.error).toBeTruthy();
    });
  });

  describe('checkValidityAndUpdate', () => {
    // tslint:disable-next-line: one-variable-per-declaration
    beforeEach(() => {
      component.passwordRule = {
        at_least_x_chars: null,
        at_max_x_chars: null,
        at_least_one_lower_case_char: null,
        at_least_one_upper_case_char: true,
        at_least_one_digit_char: true,
        at_least_one_special_char: true,
      };
      fixture.detectChanges();
    });
    it('emit value method', () => {
      const alertStop = spyOn(component, 'alertAndStop');
      component.checkValidityAndUpdate(component.passwordRule);
      fixture.detectChanges();
      expect(alertStop).toHaveBeenCalledTimes(1);

    });
  });

  describe('checkValidityAndUpdate', () => {
    // tslint:disable-next-line: one-variable-per-declaration
    beforeEach(() => {
      component.passwordRule = {
        at_least_x_chars: 8,
        at_max_x_chars: 30,
        at_least_one_lower_case_char: true,
        at_least_one_upper_case_char: null,
        at_least_one_digit_char: null,
        at_least_one_special_char: null,
      };
      fixture.detectChanges();
    });
    it('emit value method', () => {
      const alertStop = spyOn(component, 'alertAndStop');
      component.checkValidityAndUpdate(component.passwordRule);
      fixture.detectChanges();
      expect(alertStop).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkValidityAndUpdate', () => {
    // tslint:disable-next-line: one-variable-per-declaration
    beforeEach(() => {
      component.passwordRule = {
        at_least_x_chars: 5,
        at_max_x_chars: 35,
        at_least_one_lower_case_char: true,
        at_least_one_upper_case_char: true,
        at_least_one_digit_char: true,
        at_least_one_special_char: true,
      };
      fixture.detectChanges();
    });
    it('emit value method', () => {
      const alertStop = spyOn(component, 'alertAndStop');
      component.checkValidityAndUpdate(component.passwordRule);
      fixture.detectChanges();
      expect(alertStop).toHaveBeenCalledTimes(0);
    });
  });
});
