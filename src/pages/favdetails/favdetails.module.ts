import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavdetailsPage } from './favdetails';

@NgModule({
  declarations: [
    FavdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FavdetailsPage),
  ],
})
export class FavdetailsPageModule {}
