import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Paciente } from '../entidades/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  options = {headers: new HttpHeaders().set('Content-type', 'application/json')};
  constructor(
    private http: HttpClient
  ) { }

  getPacientes()  {
    return this.http.get<any>(environment.apiUrl + '/paciente', this.options).pipe(
      catchError(this.handleError)
    );
  }

  getPacientePorId(id: String): Observable<Paciente>{
    return this.http.get<Paciente>(environment.apiUrl  + '/paciente/' +id).pipe(
      catchError(this.handleError)
    );
  }

  getPacientePorCpf(cpfPaciente: string): Observable<Paciente> {
    return this.http.get<Paciente>(environment.apiUrl + '/pacientecpf/' + cpfPaciente, this.options).pipe(
      catchError(this.handleError)
    );
  }

  postPaciente(Paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(environment.apiUrl + '/authpaciente', Paciente, this.options).pipe(
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
