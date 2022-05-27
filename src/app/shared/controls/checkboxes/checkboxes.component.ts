import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { select } from '@ngrx/store';

import { ControlItem, Value } from 'src/app/models/frontend';
export { Value } from 'src/app/models/frontend';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true
    }
  ]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {

  @Input() items: ControlItem[];
  @Input() placeholder: string;
  @Output() changed = new EventEmitter<Value[]>();
  
  value: Value[];
  isDisabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(value: Value[]): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(value: Value, checked: boolean): void {
    	this.value = this.getSelected(value, checked);
      this.onChange(this.value);
      this.changed.emit(this.value); 
  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value ? [...this.value] : [];

    if(checked){
      if(!selected.includes(value)){
        selected.push(value);
      }
    } else{
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }

    return selected.length ? selected : null;
  }

  isChecked(value: Value): boolean {
    return this.value && this.value.includes(value);
  }

}
