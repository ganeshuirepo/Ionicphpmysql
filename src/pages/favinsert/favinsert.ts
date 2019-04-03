import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FavinsertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@IonicPage()
@Component({
  selector: 'page-favinsert',
  templateUrl: 'favinsert.html',
})
export class FavinsertPage {
  isFavValid: any;
  empidcheck: any;
  favCircular: boolean;
  circularidcheck: any;
  circularfavdata: any;
  employeeID: { empno: any; };
  circularUploadDate: any;
  circularId: any;
  eid: any;
  isButtonDisabled: boolean;
  item: Object;
  favinsertData: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http   : HttpClient, public storage: Storage) {
    this.item = navParams.get('data');
    this.eid = navParams.get('employee');
    this.isFavValid = "";
  }

  ionViewWillEnter() : void
  {
     this.load();
  }

  load() : void
   {

    {
        let empId = localStorage.getItem('empid');
        this.employeeID = {
          empno: empId
        }
        let empData = JSON.stringify(this.employeeID);
       // console.log("employee ID", this.employeeID);
        this.http
        .post('http://122.166.52.111/dbcon/retreive-favcircular.php', empData, httpOptions)
        .subscribe((favdata : any) =>
        {
           console.dir(favdata);
           this.circularfavdata = favdata;

        },
        (error : any) =>
        {
           console.dir(error);
        });
     }
   }

  addFav() {

    this.circularfavdata.map((favitem) => {
      Object.setPrototypeOf(this.circularfavdata, favitem);
      Object.keys(favitem);
      this.circularidcheck = favitem['Circular_no'];
      this.empidcheck = favitem['uploaded_emp_code'];
    });

    this.circularId = this.item['Circular_no'];
    this.circularUploadDate = this.item['Uploaded_date'];
    this.isButtonDisabled = true;
    // console.log("This is fav circular fav no.", this.circularidcheck);
    // console.log("This is fav employee no.",this.eid);
    // console.log("This is item circular fav no.", this.circularId);
    // console.log("This is item employee no.",this.circularUploadDate);
  if (this.circularfavdata.length == 0 || this.circularidcheck != this.circularId) {

    this.favinsertData = {
      circularno: this.circularId,
      empno: this.eid,
      circulardate: this.circularUploadDate
    }

    this.http.post('http://122.166.52.111/dbcon/postfav-data.php', this.favinsertData, httpOptions)
        .subscribe(res =>  {
           // this.formData = res;
         this.favCircular = true;
         this.isFavValid = "Hurray! Your circular marked as Favourite";
            console.log(res);
          },
          err => {
            console.log("Error occured", err);
          }
        );
  } else {
   this.favCircular = false;
   this.isFavValid = "The circular is already marked as Favourite";
    //console.log ("The circular is already marked as Favourite")
  }

  }

}
