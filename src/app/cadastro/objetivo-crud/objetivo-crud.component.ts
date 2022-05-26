import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { IIdNome } from '../../geral/id-nome.interface';

@Component({
  selector: 'app-objetivo-crud',
  templateUrl: './objetivo-crud.component.html',
  styleUrls: ['./objetivo-crud.component.scss'],
})
export class ObjetivoCrudComponent implements OnInit {
  private ID_NOVO = 'novo';
  private urlBase = 'objetivo/';

  public processando = false;
  public linhas = [];

  public idSelecionado: string | null = null;
  public form: FormGroup | null = null;
  public bases: IIdNome[] = [];
  public premios: IIdNome[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editar(id);
    } else {
      this.atualizarLinhas();
    }
  }

  private atualizarLinhas() {
    this.processando = true;
    this.http
      .get(this.urlBase)
      .pipe(finalize(() => (this.processando = false)))
      .subscribe((dados: any) => (this.linhas = dados.content));
  }

  private editar(id: string) {
    this.processando = true;

    const base = ['VENDA_VLR', 'VENDA_QTDE', 'PA', 'TICKET_MEDIO'];
    base.forEach((id) => this.bases.push({ id, nome: this.obterNomeBase(id) }));

    const premios = ['MEDALHA', 'TROFEU'];
    premios.forEach((id) => this.premios.push({ id, nome: this.obterNomePremio(id) }));

    this.idSelecionado = this.ID_NOVO;
    if (!isNaN(+id)) {
      this.http
        .get(this.urlBase + id)
        .pipe(finalize(() => (this.processando = false)))
        .subscribe((dados: any) => {
          this.idSelecionado = dados.id;
          this.montarForm(dados);
        });
    } else {
      this.montarForm({});
      this.processando = false;
    }
  }

  private montarForm(dados: any) {
    this.form = this.fb.group({
      nome: [dados.nome, Validators.required],
      dtInicio: [dados.dtInicio ? new Date(dados.dtInicio) : null, Validators.required],
      dtFim: [dados.dtFim ? new Date(dados.dtFim) : null, Validators.required],
      base: [dados.base || 'VENDA_VLR', Validators.required],
      premio: [dados.premio || 'MEDALHA', Validators.required],
    });
  }

  public excluir(id: string): void {
    if (confirm('Excluir o registro?')) {
      this.processando = true;
      this.http
        .delete(this.urlBase + id)
        .pipe(finalize(() => (this.processando = false)))
        .subscribe(() => this.atualizarLinhas());
    }
  }

  public salvar() {
    this.processando = true;

    let dados = this.form?.getRawValue();
    dados.id = null;
    dados.dtInicio = dados.dtInicio.toISOString();
    dados.dtFim = dados.dtFim.toISOString();

    let id = this.idSelecionado || this.ID_NOVO;
    if (!isNaN(+id)) {
      this.http
        .put(this.urlBase + id, dados)
        .pipe(finalize(() => (this.processando = false)))
        .subscribe(() => this.voltarLista());
    } else {
      this.http
        .post(this.urlBase, dados)
        .pipe(finalize(() => (this.processando = false)))
        .subscribe(() => this.voltarLista());
    }
  }

  private voltarLista() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }

  public obterNomeBase(base: string): string {
    switch (base) {
      case 'VENDA_VLR':
        return 'Venda Valor';
      case 'VENDA_QTDE':
        return 'Venda Qtde';
      case 'PA':
        return 'PA';
      case 'TICKET_MEDIO':
        return 'Ticket Médio';
      default:
        return '?' + base;
    }
  }

  public obterNomePremio(premio: string): string {
    switch (premio) {
      case 'MEDALHA':
        return 'Medalha';
      case 'TROFEU':
        return 'Troféu';
      default:
        return '?' + premio;
    }
  }
}
