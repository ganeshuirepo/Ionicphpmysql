import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FavinsertPage } from '../favinsert/favinsert';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MasterCircularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-master-circular',
  templateUrl: 'master-circular.html',
})
export class MasterCircularPage {
  loadData: boolean;
  displayCircular: boolean;
  circularmasterdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http   : HttpClient, public storage: Storage,public toastCtrl: ToastController,
              private zone : NgZone) {
              this.loadData = true;
  }

  ionViewWillEnter() : void
  {
     this.load();
  }

  load() : void
   {
    this.zone.run(() => {
      this.http
      .get('http://122.166.52.111/dbcon/retreive-mastercircular.php')
      .subscribe((masterdata : any) =>
      {
         console.dir(masterdata);
         this.loadData = false;
         this.circularmasterdata = masterdata;
         if (this.circularmasterdata == null) {
          this.displayCircular = false;
        } else {
          this.displayCircular = true;
        }
      },
      (error : any) =>
      {
         console.dir(error);
      });
    });
   }

  openPage(item){

      let empId = localStorage.getItem('empid');

    console.log("item is", item);
    this.navCtrl.push(FavinsertPage, {
      data: item,
      employee: empId
    });
   }

   doRefresh(refresher) {
    // console.log('Begin async operation', refresher);

    this.load();
    setTimeout(() => {
      // console.log('Async operation has ended');
      refresher.complete();
      this.presentToast('Data refreshed!!', 1500)

    }, 1500);
  }

  presentToast(myMessage, time) {
    let toast = this.toastCtrl.create({
      message: myMessage,
      duration: time
    });
    toast.present();
  }

}
