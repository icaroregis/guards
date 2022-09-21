import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IParametersInterface } from '../../interfaces/iparameters-interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  public sign(payload: IParametersInterface): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/sign`, payload).pipe(
      map((response) => {
        /* sempre que o usuario logar o antigo token será removido e será gerado um novo. */
        localStorage.removeItem('acess_token');
        localStorage.setItem('acess_token', JSON.stringify(response.token));
        this.router.navigate(['admin']);
      }),
      catchError((e) => {
        const err = new Error(
          'No momento não estamos conseguindo validar estes dados, tente novamente mais tarde!'
        );

        /* se o error.message existir ele retorna o error.message */
        if (e.error.message) {
          return throwError(() => e.error.message);
        }
        return throwError(() => err);
      })
    );
  }

  public logout() {
    localStorage.removeItem('acess_token');
    this.router.navigate(['']);
  }

  public isAuthenticated(): any {
    const token = localStorage.getItem('acess_token');

    if (!token) {
      return false;
    }

    const jwtHelper = new JwtHelperService();
    /* se o token não estiver expirado */
    return !jwtHelper.isTokenExpired(token);
  }
}
