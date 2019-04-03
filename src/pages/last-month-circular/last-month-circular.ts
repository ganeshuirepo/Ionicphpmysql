import { FavinsertPage } from './../favinsert/favinsert';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LastMonthCircularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-last-month-circular',
  templateUrl: 'last-month-circular.html',
})
export class LastMonthCircularPage {
  displayCircular: boolean;
  loadData: boolean;
  // departmentName: any;
  uploadPath: any;
  circularSrc: any;
  circularlastmonthdata: any;
  isValid: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http   : HttpClient, public storage: Storage, public toastCtrl: ToastController,
    private zone: NgZone) {
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
      .get('http://122.166.52.111/dbcon/retreive-lastmonthcircular.php')
      .subscribe((monthdata : any) =>
      {

         console.dir(monthdata);
         this.loadData = false;
         this.circularlastmonthdata = monthdata;
         if (this.circularlastmonthdata == null) {
          this.displayCircular = false;
        } else {
          this.displayCircular = true;
        }
      },
      (error : any) =>
      {
         console.dir(error);
         if(error) {
          this.loadData = false;
         }
      });
    });
   }

  //  showValue(i) {
  //    console.log("i", i);
  //  }

  openPage(item){

      let empId = localStorage.getItem('empid');

    //console.log("item is", item);
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
