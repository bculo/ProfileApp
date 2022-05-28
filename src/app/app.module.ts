import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { environment } from 'src/environments/environment';

import { MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NotificationModule } from './services/notification/notification.module';
import { StoreModule } from '@ngrx/store';

import * as state from './store/'
import { EffectsModule } from '@ngrx/effects';
import { DictionariesEffects } from './store/dictionaries/dictionaries.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './store/user/user.effects';

const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
      dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' },
  },
  display: {
      dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' },
      monthYearLabel: { year: 'numeric', month: 'short' },
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
      monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatNativeDateModule,

    NotificationModule.forRoot(),

    StoreModule.forRoot(state.reducers),
    EffectsModule.forRoot([DictionariesEffects, UserEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }), 
  ],
  providers: [  
    { provide: MAT_DATE_LOCALE, useValue: 'hr' },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
