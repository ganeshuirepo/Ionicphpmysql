import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasterCircularPage } from './master-circular';

@NgModule({
  declarations: [
    MasterCircularPage,
  ],
  imports: [
    IonicPageModule.forChild(MasterCircularPage),
  ],
})
export class MasterCircularPageModule {}
