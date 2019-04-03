import { FavdeletePage } from './../favdelete/favdelete';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FavdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@IonicPage()
@Component({
  selector: 'page-favdetails',
  templateUrl: 'favdetails.html',
})
export class FavdetailsPage {

  displayCircular: boolean;
  loadData: boolean;
  employeeID: { empno: any; };
  circularfavdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http   : HttpClient, public storage: Storage,
              public toastCtrl: ToastController, private zone: NgZone) {
                this.loadData = true;
  }

  ionViewWillEnter() : void
  {
     this.load();
  }

  load() : void
   {
      let empId = localStorage.getItem('empid');
      this.employeeID = {
        empno: empId
      }
      let empData = JSON.stringify(this.employeeID);
     // console.log("employee ID", this.employeeID);
     this.zone.run(() => {
      this.http
      .post('http://122.166.52.111/dbcon/retreive-favcircular.php', empData, httpOptions)
      .subscribe((favdata : any) =>
      {

         console.dir(favdata);
         this.loadData = false;
         this.circularfavdata = favdata;
         if (this.circularfavdata.length == 0) {
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

   opendelModal(item){

      let empID = localStorage.getItem('empid');

      let circularID = item['circular_id'];
      let favdeleteData = {
        empno: empID,
        cirid: circularID
      }
      this.http
      .post('http://122.166.52.111/dbcon/delete-favcircular.php', favdeleteData, httpOptions)
      .subscribe(res =>
      {
         console.dir(res);

      },
      (error : any) =>
      {
         console.dir(error);
      });
    console.log("item is", item);
    this.navCtrl.push(FavdeletePage, {
      msg: circularID
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
