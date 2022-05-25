import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

import { CadastroRoutingModule } from './cadastro-routing.module';

import { ObjetivoCrudComponent } from './objetivo-crud/objetivo-crud.component';

@NgModule({
  declarations: [ObjetivoCrudComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    CadastroRoutingModule,
  ],
})
export class CadastroModule {}
