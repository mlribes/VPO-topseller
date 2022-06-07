import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Erro: ${error.error.message}`;
        } else {
          console.log('This is server side error');
          errorMsg = `Código: ${error.status},  Mensagem: ${error.message}`;
        }
        this.messageService.add({ key: 'global', severity: 'error', summary: 'Erro', detail: errorMsg });
        return throwError(errorMsg);
      })
    );
  }
}
