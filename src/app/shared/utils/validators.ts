import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];


      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ repeat: true });
        return { repeat: true };
      }
      
      return null;
    };
  }
    
  }