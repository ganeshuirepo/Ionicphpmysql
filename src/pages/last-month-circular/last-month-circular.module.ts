import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LastMonthCircularPage } from './last-month-circular';

@NgModule({
  declarations: [
    LastMonthCircularPage,
  ],
  imports: [
    IonicPageModule.forChild(LastMonthCircularPage),
  ],
})
export class LastMonthCircularPageModule {}
