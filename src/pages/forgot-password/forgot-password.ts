import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  //connectedEID: any;
  appempID: any;
  empiddata: any;
  passwordUpdation: FormGroup;
  dashBoardPage: any;
  // formData: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, public http   : HttpClient,
              public storage: Storage) {
    this.passwordUpdation = this.formBuilder.group({
      empid: [
        '', Validators.compose([
            Validators.pattern(regexValidators.number),
            Validators.required])
            ],
      emailid: [
        '', Validators.compose([
            Validators.pattern(regexValidators.email),
            Validators.required])
            ]
    });
  }
  ionViewWillEnter() : void
  {
     this.load();
  }

  load() : void
  {
    this.http
    .get('http://122.166.52.111/dbcon/registerapp-data.php')
    .subscribe((empdata : any) =>
    {
       console.dir(empdata);
       this.empiddata = empdata;
    },
    (error : any) =>
    {
       console.dir(error);
    });

   }

  forgotPassword(form: NgForm) {
     let enterData = form.value;
     this.empiddata.map((evalue) => {
      Object.setPrototypeOf(enterData, evalue);
      Object.keys(evalue);
      this.appempID = evalue['Emp_id'];

     let enteremployeeid = enterData['empid'];
    //   let enternewpassword = enterData['newpassword'];
     console.log("DB Employee ID ", this.appempID);
      if ( enteremployeeid == this.appempID) {
     //   console.log("enter data", enterData);
    // console.log("enter Employee ID ", this.appempID);
        this.http.post('http://122.166.52.111/dbcon/forgotpassword_new.php', enterData, httpOptions)
      .subscribe(res =>  {
         // this.formData = res;

          console.log(res);

        },
        err => {
          console.log("Error occured", err);
        }
      );
    }
  })
  form.reset();
  }

}
