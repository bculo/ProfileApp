import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type PasswordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {

  @Input() placeHolder: string;
  @Output() changed = new EventEmitter<string>();

  value: string;
  isDisabled: boolean;
  passwordType: PasswordType;

  constructor() { 
    this.passwordType = 'password';
  }

  ngOnInit(): void {
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(value: string): void {  
    this.value = value;
    this.onChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    this.onTouch();
  }

  togglePassword(): void {
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
  }


}
