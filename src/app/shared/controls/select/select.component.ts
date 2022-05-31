import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { ControlItem, Value } from 'src/app/models/frontend';
export { Value } from 'src/app/models/frontend';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() items: ControlItem[];
  @Input() placeholder: string;
  @Output() changed = new EventEmitter<Value>();

  value: Value;
  isDisabled: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log("SelectComponent");
    console.log(this.items);
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(value: Value): void {
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

  onBlur(): void {
    this.onTouch();
  }

  onChanged(change: MatSelectChange): void {
    const value = change.value ? change.value : null;
    this.value = value;

    this.onChange(value);
    this.changed.emit(value);
  }

}
