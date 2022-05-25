import { finalize } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessaoService } from './sessao.service';

interface IUsuario {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(private http: HttpClient, private sessaoService: SessaoService) {}

  jaAutenticado(): boolean {
    return this.sessaoService.jaAutenticado();
  }

  entrar(usuario: IUsuario): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.post('acesso/login', usuario).subscribe(
        (data: any) => {
          this.sessaoService.setToken(data.token);
          resolve(true);
        },
        (err) => resolve(false)
      );
    });
  }

  sair(): Promise<void> {
    return new Promise((resolve) => {
      this.http
        .get('acesso/logout')
        .pipe(finalize(() => this.sessaoService.limpar()))
        .subscribe(() => resolve());
    });
  }
}
