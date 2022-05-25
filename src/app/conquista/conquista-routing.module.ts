import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConquistaGeralComponent } from './conquista-geral/conquista-geral.component';

const routes: Routes = [{ path: 'conquistaGeral', component: ConquistaGeralComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConquistaRoutingModule {}
