import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Atendimento } from '../entidades/atendimento';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  options = {headers: new HttpHeaders().set('Content-type', 'application/json')};
  constructor(
    private http: HttpClient, private cookieService: CookieService
  ) { }

  getAtendimento(): Observable<Atendimento[]> {
    return this.http.get<any>(environment.apiUrl + '/atendimento', this.options).pipe(
      catchError(this.handleError)
    );
  }

  getAtendimentoPorId(id: String): Observable<Atendimento>{
    return this.http.get<Atendimento>(environment.apiUrl  + '/atendimento/' +id).pipe(
      catchError(this.handleError)
    );
  }

  getAtendimentoPorUnidade(id: String, andamento?) {
    let params = andamento ? {andamento}: {};
    return  this.http.get<Atendimento[]>(environment.apiUrl + '/atendimentodeunidade/' + id, {headers : this.options.headers, params}).pipe(
      catchError(this. handleError)
    );
  }
  
  getTempo(id, pacient?: boolean): Observable<any[]> {
    let params;

    if(pacient) {
      params = {paciente: true};
    } else {
      params = {paciente: false};
    }

    return this.http.get<any>(environment.apiUrl + '/tempo/' + id, {headers: this.options.headers, params}).pipe(
      catchError(this.handleError)
    );
  }

  postAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(environment.apiUrl + '/authatendimento', atendimento, this.options).pipe(
      catchError(this.handleError)
    );
  }

  patchAtendimento(id: String, atendimento: Atendimento):Observable<Atendimento> {
    return  this.http.patch<Atendimento>(environment.apiUrl+ '/atendimento/' + id, atendimento, this.options).pipe(
      catchError(this.handleError)
    );
  }

  deleteAtendimento(id: string): Observable<Atendimento>{
    return this.http.delete<Atendimento>(environment.apiUrl + '/atendimento/' + id).pipe(
      catchError(this.handleError)
      );
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
