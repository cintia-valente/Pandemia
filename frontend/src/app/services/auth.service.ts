import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  options = {headers: new HttpHeaders().set('Content-type', 'application/json')};
  constructor(
    private http: HttpClient, private cookieService: CookieService
  ) { }

  postLogin(login) {
    return this.http.post<any>(environment.apiUrl + '/auth/authenticate', login, this.options).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLogged(){
    if(localStorage.getItem('token') == null){
      return false;
      console
    }else{
      return true;
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Ocorreu um erro no lado do cliente ou na rede. Trate-o de acordo.
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // O backend retornou um código de resposta malsucedido.
      // O corpo da resposta pode conter pistas sobre o que deu errado.
      console.error(
        `Backend retornou o código ${error.status}, ` +
        `corpo: ${error.error}`);
      return throwError(error.status);
    }
    // Retorna um observável com uma mensagem de erro voltada para o usuário
    return throwError(
      'Something bad happened; please try again later.');
  }
}
