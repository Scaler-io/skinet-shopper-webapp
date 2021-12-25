import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        private toastr: ToastrService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error:any) => {
                if(error){
                    switch(error.status){
                        case HttpStatusCode.BadRequest:
                            this.toastr.error(error.error.message, error.error.statusCode);
                            break;
                        case HttpStatusCode.UnprocessableEntity:
                            throw error.error;
                        case HttpStatusCode.Unauthorized:
                                this.toastr.error(error.error.message, error.error.statusCode);
                                break;
                        case HttpStatusCode.NotFound:
                            this.router.navigateByUrl('/not-found');
                            break;
                        case HttpStatusCode.InternalServerError:
                            const navigationExtras: NavigationExtras = {state: {error: error.error}}
                            this.router.navigateByUrl('/server-error', navigationExtras);
                            break;
                    }
                }
                return throwError(() => new Error(error));
            })
        );
    }
}
