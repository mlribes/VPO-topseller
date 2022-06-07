import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpErrorInterceptor } from './geral/http-error.interceptor';
import { TokenInterceptor } from './geral/token.interceptor';
import { BaseUrlInterceptor } from './geral/base-url.interceptor';

import { environment } from '../environments/environment';

import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { MessageService } from 'primeng/api';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    TabMenuModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: 'BASE_API_URL', useValue: environment.baseUrl },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
