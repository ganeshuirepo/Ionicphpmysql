import { GetCirDataService } from './../../Services/getCirData';
import { FavinsertPage } from './../favinsert/favinsert';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-monthcircular',
  templateUrl: 'monthcircular.html',
})
export class MonthcircularPage {
  errorMessage: any;
  displayCircular: boolean;
  loadData: boolean;
  // departmentName: any;
  uploadPath: any;
  circularSrc: any;
  circularmonthdata: any;
  isValid: boolean;
  // selectdepartment: any;

  // public items : Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: Storage, public toastCtrl: ToastController,
              private getcirculars: GetCirDataService) {
              this.loadData = true;
  }

  ionViewWillEnter() : void
  {
     this.load();
  }

  load() : void
   {
    this.getcirculars.getMonthCircular()
    .subscribe(monthdata => {
      console.log("monthdata is:",monthdata)
      this.circularmonthdata = monthdata;
      if (this.circularmonthdata == null) {
        this.displayCircular = false;
      } else {
        this.displayCircular = true;
      }
    },
      error => this.errorMessage = <any>error);
      this.loadData = false;

   }

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
