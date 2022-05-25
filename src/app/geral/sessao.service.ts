import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessaoService {
  constructor() {}

  setToken(token: string): void {
    window.localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return window.localStorage.getItem('token');
  }

  jaAutenticado(): boolean {
    return this.getToken() !== null;
  }

  limpar(): void {
    window.localStorage.removeItem('token');
  }
}
