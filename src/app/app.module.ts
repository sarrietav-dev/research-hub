import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth } from '@angular/fire/auth';
import { provideStorage } from '@angular/fire/storage';
import { connectAuth, connectStorage } from 'src/config/firebase-config';

import { ChartModule } from 'angular-highcharts';
import { GraphViewerComponent } from './graph-viewer/graph-viewer.component';

@NgModule({
  declarations: [AppComponent, GraphViewerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(connectAuth),
    provideStorage(connectStorage),
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
