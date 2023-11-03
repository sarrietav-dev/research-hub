import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth } from '@angular/fire/auth';
import { provideStorage } from '@angular/fire/storage';
import { connectAuth, connectStorage } from 'src/config/firebase-config';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';


@NgModule({
  declarations: [AppComponent, UploadExcelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    NgxMatFileInputModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(connectAuth),
    provideStorage(connectStorage),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
