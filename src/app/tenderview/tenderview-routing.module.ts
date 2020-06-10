import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenderviewPage } from './tenderview.page';

const routes: Routes = [
  {
    path: '',
    component: TenderviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenderviewPageRoutingModule {}
