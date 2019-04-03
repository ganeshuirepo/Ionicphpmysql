import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FavinsertPage } from '../favinsert/favinsert';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OldCircularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-old-circular',
  templateUrl: 'old-circular.html',
})
export class OldCircularPage {

  displayCircularData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: Storage) {
    this.displayCircularData = this.navParams.get('oldCirclarData');
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
