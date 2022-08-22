import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertControlService } from "../pages/components/alert-control/alert-control.service"; 


@Injectable({
    providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private alertService: AlertControlService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
                debugger;
                if([400,401,402,403,404,500].includes(err.status)) {                    
                    this.alertService.show(err.error?.mensaje ?? 'Error al procesar información');                    
                }
                if([501,502,503,504].includes(err.status)){
                    this.alertService.show(err.error?.mensaje ?? 'Error de servidor');
                }
            }
            return throwError(err.error);
        }));
    }
}
