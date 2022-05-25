import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ObjetivoCrudComponent } from './objetivo-crud/objetivo-crud.component';

const routes: Routes = [
  { path: 'objetivo', component: ObjetivoCrudComponent },
  { path: 'objetivo/:id', component: ObjetivoCrudComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroRoutingModule {}
