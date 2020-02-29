import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  private apiKey = '6caa095d7f4d0115b62893c483ad3c89';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqWithApiKey = req.clone({
      url: req.url.concat(`&APPID=${this.apiKey}`)
    });
    return next.handle(reqWithApiKey);
  }
}
