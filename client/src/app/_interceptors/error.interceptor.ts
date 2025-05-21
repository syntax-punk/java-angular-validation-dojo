import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toaster = inject(ToastrService);

  return next(req).pipe(
    catchError(response => {
      if (response) {
        const { status, error } = response;

        switch (status) {
          case 400:
            if (error.errors) {
              for (const key in error.errors) {
                if (error.errors[key]) {
                  toaster.error(`${key}: ${error.errors[key]}`, status);
                }
              }
            } else {
              toaster.error(error, status);
            }
            break;
          case 401:
            toaster.error('Unathorized call', error.status);
            break;
          case 404:
            router.navigateByUrl('/404');
            break;
          case 500: {
            // const navigationExtras: NavigationExtras = {
            //   state: { error: error.error }
            // };
            // router.navigateByUrl('/server-error', navigationExtras);
            toaster.error('Server error: ', error.status);
            break;
          }
          default:
            toaster.error('Something went wrong');
            break;
        }
      }

      throw response;
    })
  );
};
