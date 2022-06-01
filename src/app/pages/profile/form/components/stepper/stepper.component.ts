import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from './services/stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, OnDestroy {

  private destroy = new Subject<any>();

  constructor(private stepper: StepperService) { }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit(): void {
    this.stepper.next$.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.stepper.onNext();
    });
  }

  get steps() {
    return this.stepper.steps;
  }

  get activeStep() {
    return this.stepper.activeStep;
  }

  isActive(index: number) {
    return index == this.activeStep.index;
  }

  isCompleted(index: number) {
    return index < this.activeStep.index;
  }

  isFirst() {
    return this.activeStep.index === 0;
  }

  isLast(){
    return this.activeStep.index === (this.stepper.steps.length - 1);
  }

  onNext() {
    this.stepper.check.next('next');
  }

  onComplete() {
    this.stepper.check.next('complete');
  }

  onPrev() {
      this.stepper.onPrev();
  }

  onCancel() {
    this.stepper.cancel.next();
  }
}
