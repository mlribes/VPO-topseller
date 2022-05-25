import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject('BASE_API_URL') private baseUrl: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({ url: `${this.baseUrl}${request.url}` });
    return next.handle(apiReq);
  }
}
