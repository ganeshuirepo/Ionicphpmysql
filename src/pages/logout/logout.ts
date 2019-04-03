import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  loginPage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: Storage) {
                // this.storage.remove('empname');
                //console.log("employee id removed",  this.storage.remove('empname'));
               // this.storage.remove('empid');
    localStorage.removeItem('empname');
    this.loginPage = LoginPage;

    //this.storage.remove('empregname')
   // storage.set('email', '');

  }


}
