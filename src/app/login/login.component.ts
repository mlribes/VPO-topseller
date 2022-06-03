import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from '../geral/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: UntypedFormGroup;
  public falhaLogin = false;
  private retUrl: string | null;

  constructor(
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      senha: ['', Validators.required],
    });

    this.retUrl = null;
  }

  ngOnInit(): void {
    this.retUrl = this.activatedRoute.snapshot.queryParamMap.get('retUrl');

    if (this.autenticacaoService.jaAutenticado()) {
      this.irPagina();
    }
  }

  async entrar(): Promise<void> {
    this.falhaLogin = !(await this.autenticacaoService.entrar(this.form.getRawValue()));
    if (!this.falhaLogin) {
      this.irPagina();
    }
  }

  private irPagina(): void {
    let retUrl = this.retUrl;
    if (!retUrl) {
      retUrl = '/';
    }
    this.router.navigate([retUrl]);
  }
}
