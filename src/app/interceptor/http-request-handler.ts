import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestHandler implements HttpInterceptor {

    constructor(private toastrService: ToastrService,
        private loaderService: LoaderService,
        private userService: UserService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoader();
        const preparedRequest = this.prepareRequest(request);
        return next.handle(preparedRequest).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.hideLoader();
                this.checkUserAuthentication(request, event);
            }
        }, (error: HttpErrorResponse) => {
            this.handleError(error);
        }));
    }

    checkUserAuthentication(request: HttpRequest<any>, response: HttpResponse<any>) {
        if (request.method == "GET" && request.url.startsWith(this.userService.enpoint())) {
            this.userService.defineCurrentUser(response.body);
        }
    }

    handleError(error: HttpErrorResponse) {
        this.hideLoader();
        console.log(error);
        if (error.status === 500) {
            this.toastrService.error("The requested operation failed.");
        }
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }

    private prepareRequest(request: HttpRequest<any>): HttpRequest<any> {
        if (this.userService.hasAuthenticatedUser()) {
            const userId = this.userService.authenticatedUserId();
            const headers = request.headers.append("userId", userId);
            return request.clone({ headers: headers });
        }
        return request;
    }

}