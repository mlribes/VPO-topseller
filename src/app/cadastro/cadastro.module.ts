import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';

import { ObjetivoCrudComponent } from './objetivo-crud/objetivo-crud.component';

@NgModule({
  declarations: [ObjetivoCrudComponent],
  imports: [CommonModule, CadastroRoutingModule],
})
export class CadastroModule {}
