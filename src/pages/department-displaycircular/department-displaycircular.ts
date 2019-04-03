import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FavinsertPage } from '../favinsert/favinsert';

/**
 * Generated class for the DepartmentDisplaycircularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-department-displaycircular',
  templateUrl: 'department-displaycircular.html',
})
export class DepartmentDisplaycircularPage {

  displayCircularData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage) {
    this.displayCircularData = this.navParams.get('deptCirclarData');
  }
  openPage(item){

    let empId = localStorage.getItem('empid');

    //console.log("item is", item);
    this.navCtrl.push(FavinsertPage, {
      data: item,
      employee: empId
    });
   }


}
