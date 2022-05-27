import { Injectable } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificaitonComponent } from './notificaiton/notificaiton.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  error(message: string): void {
    this.snackBar.openFromComponent(NotificaitonComponent, {
      duration: 3000,
      data: { message },
      panelClass: ["mat-snackbar_error"]
    })
  }

  success(message: string): void {
    this.snackBar.openFromComponent(NotificaitonComponent, {
      duration: 3000,
      data: { message },
      panelClass: ["mat-snackbar_success"]
    })
  }
}
