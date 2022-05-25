import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { AutenticacaoService } from '../geral/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public items: MenuItem[];
  constructor(private router: Router, private autenticacaoService: AutenticacaoService) {
    this.items = [
      { label: 'Objetivo', routerLink: '/cadastro/objetivo' },
      { label: 'Resultados', routerLink: '/conquista/conquistaGeral' },
      { label: 'Sair', command: () => this.sair() },
    ];
  }

  ngOnInit(): void {}

  async sair(): Promise<void> {
    await this.autenticacaoService.sair();
    this.router.navigate(['login']);
  }
}
