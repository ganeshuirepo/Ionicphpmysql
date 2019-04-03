import { GetCirDataService } from './../../Services/getCirData';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FavinsertPage } from '../favinsert/favinsert';

/**
 * Generated class for the TodaycircularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todaycircular',
  templateUrl: 'todaycircular.html',
})
export class TodaycircularPage {
  errorMessage: any;
  loadData: boolean;
  displayCircular: boolean;
  circulardaycount: any;
  uploadPath: any;
  circulartodaydata: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: Storage,public toastCtrl: ToastController,
              private getcirculars: GetCirDataService) {
                this.loadData = true;
  }

  ionViewWillEnter() : void
  {
     this.load();
  }

  load() : void
   {
    this.getcirculars.getDayCircular()
    .subscribe(todaydata => this.circulartodaydata = todaydata,
      error => this.errorMessage = <any>error);
      this.loadData = false;
      if (this.circulartodaydata == null) {
        this.displayCircular = false;
      } else {
       this.displayCircular = true;
      }

   }

   openPage(item){

      let empId = localStorage.getItem('empid');;

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
