import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isAuthorized: boolean = false;
  @Output() signOut = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSignOut() {
    this.signOut.emit();
  }  
}
