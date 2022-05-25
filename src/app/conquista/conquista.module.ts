import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConquistaRoutingModule } from './conquista-routing.module';

import { ConquistaGeralComponent } from './conquista-geral/conquista-geral.component';

@NgModule({
  declarations: [ConquistaGeralComponent],
  imports: [CommonModule, ConquistaRoutingModule],
})
export class ConquistaModule {}
