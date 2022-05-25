import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacaoService } from '../geral/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private autenticacaoService: AutenticacaoService) {}

  ngOnInit(): void {}

  async sair(): Promise<void> {
    await this.autenticacaoService.sair();
    this.router.navigate(['login']);
  }
}
