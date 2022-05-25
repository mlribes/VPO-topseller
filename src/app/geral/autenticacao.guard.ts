import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private autenticacaoService: AutenticacaoService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.autenticacaoService.jaAutenticado()) {
      return true;
    } else {
      let retUrl = state.url;
      if (retUrl === '/') {
        retUrl = '';
      }
      this.router.navigate(['login'], { queryParams: { retUrl } });
      return false;
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(next, state);
  }
}
