import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { FavinsertPage } from '../favinsert/favinsert';

/**
 * Generated class for the WeekcircularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weekcircular',
  templateUrl: 'weekcircular.html',
})
export class WeekcircularPage {

  displayCircular: boolean;
  loadData: boolean;
  circularweekdata: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http   : HttpClient, public storage: Storage,public toastCtrl: ToastController,
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
      .get('http://122.166.52.111/dbcon/retreive-weekcircular.php')
      .subscribe((weekdata : any) =>
      {
         console.dir(weekdata);
         this.circularweekdata = weekdata;
         //this.items = data;
        this.loadData = false;
         if (this.circularweekdata == null) {
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

      let empId = localStorage.getItem('empid');;

   // console.log("item is", item);
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
