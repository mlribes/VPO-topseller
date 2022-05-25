import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SessaoService } from './sessao.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private sessaoService: SessaoService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.sessaoService.getToken();
    let req = request;
    if (token) {
      req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req);
  }
}
