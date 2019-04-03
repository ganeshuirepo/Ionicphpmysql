import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartmentListPage } from './department-list';

@NgModule({
  declarations: [
    DepartmentListPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartmentListPage),
  ],
})
export class DepartmentListPageModule {}
