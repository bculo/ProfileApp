import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss']
})
export class UserPhotoComponent implements OnInit {
  @Input() photoURL: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  get safePhotoURL(){
    return this.photoURL ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.photoURL})`) : null;
  }

}
