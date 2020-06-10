import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenderviewPageRoutingModule } from './tenderview-routing.module';

import { TenderviewPage } from './tenderview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenderviewPageRoutingModule
  ],
  declarations: [TenderviewPage]
})
export class TenderviewPageModule {}
