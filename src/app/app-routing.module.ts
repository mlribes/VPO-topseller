import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutenticacaoGuard } from './geral/autenticacao.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AutenticacaoGuard],
  },
  {
    path: 'cadastro',
    component: HomeComponent,
    loadChildren: () => import('./cadastro/cadastro.module').then((m) => m.CadastroModule),
    canActivate: [AutenticacaoGuard],
    canActivateChild: [AutenticacaoGuard],
  },
  {
    path: 'conquista',
    component: HomeComponent,
    loadChildren: () => import('./conquista/conquista.module').then((m) => m.ConquistaModule),
    canActivate: [AutenticacaoGuard],
    canActivateChild: [AutenticacaoGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
