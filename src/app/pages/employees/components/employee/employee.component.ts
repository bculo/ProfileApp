import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../store/list';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Input() employee: User;

  constructor() { }

  ngOnInit(): void {
  }

}
