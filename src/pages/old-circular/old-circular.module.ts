import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OldCircularPage } from './old-circular';

@NgModule({
  declarations: [
    OldCircularPage,
  ],
  imports: [
    IonicPageModule.forChild(OldCircularPage),
  ],
})
export class OldCircularPageModule {}
