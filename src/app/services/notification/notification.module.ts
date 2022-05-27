import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificaitonComponent } from './notificaiton/notificaiton.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [
    NotificaitonComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ]
})
export class NotificationModule {
  static forRoot() {
      return {
          ngModule: NotificationModule,
          providers: [
              NotificationService
          ]
      };
  }
}


