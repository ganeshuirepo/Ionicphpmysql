import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FavdeletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favdelete',
  templateUrl: 'favdelete.html',
})
export class FavdeletePage {

  message: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = navParams.get('msg');
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad FavdeletePage');
  }

}
