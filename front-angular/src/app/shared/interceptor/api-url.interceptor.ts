import { Injectable, isDevMode  } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { environment as devEnvironment } from 'src/environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let url;
    if (isDevMode()) {
      url = devEnvironment.API_URL;
    } else {
      url = environment.API_URL;
    }
    
    const apiReq = request.clone({ url: `${url}/${request.url}` });
    return next.handle(apiReq);
  }
}
