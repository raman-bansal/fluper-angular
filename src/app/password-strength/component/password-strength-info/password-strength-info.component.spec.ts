import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PasswordStrengthInfoComponent } from './password-strength-info.component';
import { PasswordStrengthModule } from '../../password-strength.module';
import { _Requirements } from '../../interface/password-rule';

fdescribe('PasswordStrengthInfoComponent', () => {
  let component: PasswordStrengthInfoComponent;
  let fixture: ComponentFixture<PasswordStrengthInfoComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordStrengthInfoComponent],
      imports: [PasswordStrengthModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthInfoComponent);
    component = fixture.componentInstance;
    component.passwordRule = {
      at_least_one_digit_char: true,
      at_least_one_lower_case_char: true,
      at_least_one_special_char: true,
      at_least_one_upper_case_char: true,
      at_least_x_chars: 8,
      at_max_x_chars: 30,
    };

    component.requirments = {
      at_least_one_digit_char: true,
      at_least_one_lower_case_char: true,
      at_least_one_special_char: true,
      at_least_one_upper_case_char: true,
      at_least_x_chars: true,
      at_max_x_chars: true,
      password: "Raman@12"
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('password strength info method', () => {
    let requirments: _Requirements;
    beforeEach(() => {
      requirments = {
        at_least_one_digit_char: true,
        at_least_one_lower_case_char: true,
        at_least_one_special_char: true,
        at_least_one_upper_case_char: true,
        at_least_x_chars: true,
        at_max_x_chars: true,
        password: "Raman@12"
      }
    });
    it('infovisible method output', () => {
      expect(component.infoVisible(requirments)).toBeFalsy();
    });

    it('run change detection method', () => {
      component.runChangeDetection();
      expect(component.showInfo).toBeFalsy();
    });
  });
});

