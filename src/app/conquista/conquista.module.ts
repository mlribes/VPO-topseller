import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { ConquistaRoutingModule } from './conquista-routing.module';

import { ConquistaGeralComponent } from './conquista-geral/conquista-geral.component';

@NgModule({
  declarations: [ConquistaGeralComponent],
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, DropdownModule, ConquistaRoutingModule],
})
export class ConquistaModule {}
