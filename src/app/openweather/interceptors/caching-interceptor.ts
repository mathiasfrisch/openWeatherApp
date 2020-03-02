import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestCache {
  private cache: {[url: string]: any} = {};

  public get(reqUrl: string): any {
    console.log('get from cache: ' + reqUrl + ': ' + this.cache[reqUrl]);
    return this.cache[reqUrl];
  }

  public put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
    console.log('set to cache: ' + req.url + ': ' + resp);
    this.cache[req.url] = resp;
  }
}

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCache) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isCachable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.url);
    const results$ = this.sendRequest(req, next, this.cache);
    return cachedResponse ? results$.pipe( startWith(cachedResponse) ) : results$;
    // return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  private isCachable(req: HttpRequest<any>): boolean {
    return req.method === 'GET';
  }

  private sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: RequestCache): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(req, event);
        }
      })
    );
  }
}


