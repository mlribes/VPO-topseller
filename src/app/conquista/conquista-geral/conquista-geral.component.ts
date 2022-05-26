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
  private urlBase = 'objetivo/';

  public processando = false;
  public form: FormGroup;

  public objetivos: IIdNome[] = [];
  public objetivoSelecionado = '';
  public conquistas = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      objetivo: [],
    });
  }

  ngOnInit(): void {
    this.atualizarObjetivos();

    this.form.get('objetivo')?.valueChanges.subscribe((objetivo) => {
      this.atualizarConquistas(objetivo), (this.objetivoSelecionado = objetivo);
    });
  }

  private atualizarObjetivos() {
    this.processando = true;
    this.http
      .get(this.urlBase + 'lov')
      .pipe(finalize(() => (this.processando = false)))
      .subscribe((dados: any) => {
        this.objetivos = dados;
        this.objetivos.push({ nome: '--Selecione um--' });
      });
  }

  private atualizarConquistas(objetivo: string) {
    this.processando = true;
    this.http
      .get(this.urlBase + objetivo + '/conquista')
      .pipe(finalize(() => (this.processando = false)))
      .subscribe((dados: any) => (this.conquistas = dados));
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
    this.http
      .get(this.urlBase + this.objetivoSelecionado + '/conquista/xls', {
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
