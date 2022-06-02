import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { IIdNome } from '../../geral/id-nome.interface';

@Component({
  selector: 'app-conquista-geral',
  templateUrl: './conquista-geral.component.html',
  styleUrls: ['./conquista-geral.component.scss'],
})
export class ConquistaGeralComponent implements OnInit {
  private urlBase = 'conquista/';

  public processando = false;
  public form: FormGroup;
  public tipos: IIdNome[] = [
    { id: 'porPeriodo', nome: 'Por período' },
    { id: 'porIndicador', nome: 'Por indicador' },
  ];
  public indicadores: IIdNome[] = [
    { id: 'VENDA_VLR', nome: 'Venda R$' },
    { id: 'VENDA_QTDE', nome: 'Venda Qtde' },
    { id: 'PA', nome: 'PA' },
    { id: 'TICKET_MEDIO', nome: 'Ticket Médio' },
  ];

  public colunas = [];
  public linhas = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    let dtFim = new Date();
    dtFim.setDate(0);
    let dtInicio = new Date(dtFim);
    dtInicio.setMonth(dtInicio.getMonth() - 11);
    this.form = this.fb.group({
      dtInicio: [dtInicio, Validators.required],
      dtFim: [dtFim, Validators.required],
      tipo: ['porPeriodo', Validators.required],
      indicador: [{ value: 'VENDA_VLR', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.get('tipo')?.valueChanges.subscribe((valor) => {
      if (valor == 'porIndicador') {
        this.form.get('indicador')?.enable();
      } else {
        this.form.get('indicador')?.disable();
      }

      this.colunas = [];
      this.linhas = [];
    });
  }

  public atualizar() {
    this.processando = true;
    this.colunas = [];
    this.linhas = [];

    const url = this.form.get('tipo')?.value;
    const dtInicio = this.form.get('dtInicio')?.value.toISOString().substring(0, 10);
    const dtFim = this.form.get('dtFim')?.value.toISOString().substring(0, 10);
    const indicador = this.form.get('indicador')?.value;

    this.http
      .get(this.urlBase + url, { params: { dtInicio, dtFim, indicador } })
      .pipe(finalize(() => (this.processando = false)))
      .subscribe((dados: any) => {
        if (url === 'porPeriodo') {
          this.linhas = dados;
        } else {
          this.colunas = dados.colunas;
          this.linhas = dados.linhas;
        }
      });
  }

  public obterImagemPremio(premio: string, classificacao: string) {
    let retorno;
    if (classificacao) {
      switch (premio) {
        case 'MEDALHA':
          retorno = 'medal';
          break;
        case 'TROFEU':
          retorno = 'trophy';
          break;
        default:
          retorno = 'xmark';
          break;
      }
    } else {
      retorno = 'xmark';
    }
    return retorno;
  }

  public baixarXls() {
    const url = this.form.get('tipo')?.value + '/xls';
    const dtInicio = this.form.get('dtInicio')?.value.toISOString().substring(0, 10);
    const dtFim = this.form.get('dtFim')?.value.toISOString().substring(0, 10);
    const indicador = this.form.get('indicador')?.value;

    this.http
      .get(this.urlBase + url, {
        params: { dtInicio, dtFim, indicador },
        responseType: 'blob',
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.body) {
          const url = URL.createObjectURL(response.body);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = 'resultados.xlsx';
          anchor.click();
          URL.revokeObjectURL(url);
        }
      });
  }
}
