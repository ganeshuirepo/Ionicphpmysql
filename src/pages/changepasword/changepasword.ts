import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { regexValidators } from '../validators/validator';
import { Storage } from '@ionic/storage';
import { DashBoardPage } from '../dash-board/dash-board';

/**
 * Generated class for the ChangepaswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@IonicPage()
@Component({
  selector: 'page-changepasword',
  templateUrl: 'changepasword.html',
})
export class ChangepaswordPage {
  isPasswordValid: boolean;
  passwordupdate: Object;
  connectedUserID: any;
  appempPassword: any;
  appempID: any;
  empiddata: any;
  // enternewpassword: any;
  // connectedPassword: any;
  passwordUpdation: FormGroup;
  dashBoardPage: any;
  // formData: any;


  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, public app: App,
              public storage: Storage, public http   : HttpClient) {

            //    console.log("this is active name", this.navCtrl.getActive().name);
            //    this.storage.get('empid').then((val) => {
            //      this.connectedUserID = val;
            //      console.log("username within get",this.connectedUserID);
            //    });
             this.connectedUserID = localStorage.getItem('empid');
             console.log("Enter ID is", this.connectedUserID);
                {
                  this.http
                  .get('http://122.166.52.111/dbcon/registerapp-data.php')
                  .subscribe((empdata: any) => {
                     console.dir(empdata);
                     this.empiddata = empdata;
                  },
                  (error: any) => {
                     console.dir(error);
                  });

                 }
    this.passwordUpdation = this.formBuilder.group({
      empid: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      oldpassword: [
        '', Validators.compose([
          Validators.pattern(regexValidators.password),
          Validators.required
        ])
      ],
      newpassword: [
        '', Validators.compose([
          Validators.pattern(regexValidators.password),
          Validators.required
        ])
      ]
    });
  }
  ionViewWillEnter() : void
  {
     this.load();
  }

  load() : void {
    let nav = this.app.getActiveNavs()[0];
    let activeView = nav.getActive();
    let viewName = this.navCtrl.getActive().name;
      this.platform.registerBackButtonAction(() => {
       if (this.navCtrl.canGoBack() && activeView.name !== viewName) {
        this.navCtrl.pop();
       }  else {
        if (activeView.name === 'DashBoardPage' || activeView.name === viewName) {
          nav.setRoot(DashBoardPage);
        } else {
          this.platform.exitApp();
        }
        // IF IT'S THE ROOT, EXIT THE APP.
      }
     });
  }


  updatePassword(form: NgForm) {
     let enterData = form.value;
     this.passwordupdate = "";
    let enteroldpassword = enterData['oldpassword'];
      let enternewpassword = enterData['newpassword'];
      let enteremployeeid = enterData['empid'];
      this.empiddata.map((evalue) => {
        Object.setPrototypeOf(enterData, evalue);
        Object.keys(evalue);
        this.appempID = evalue['Emp_id'];
        this.appempPassword = evalue['password']
      // console.log("DB Employee ID ", this.appempID);
       // let enternewpassword = enterData['newpassword'];
      //console.log("DB Employee appempPassword ", this.appempPassword);
        if ( enteremployeeid == this.appempID)  {
        if (this.appempPassword == enteroldpassword ) {
          if (this.connectedUserID == enteremployeeid ) {
          if (enteroldpassword != enternewpassword) {
         //console.log("enter data", enterData);
       let empData = JSON.stringify(enterData);
      console.log("Enter data is", this.connectedUserID);
      console.log("enter Employee ID ", this.appempID);
          this.http.post('http://122.166.52.111/dbcon/changepassword.php', empData, httpOptions)
        .subscribe(res =>  {
           // this.formData = res;
            this.isPasswordValid = true;
            console.log(res);

            this.passwordupdate = res;
            this.navCtrl.setRoot(DashBoardPage);
          },
          err => {
            console.log("Error occured", err);
          }
        );
      } else {
        let message = "Kindly enter your ID or Password correctly";
        this.isPasswordValid = false;
        this.passwordupdate = message;
      }
    }
  }
}
    })
    // this.storage.get('Password').then((val) => {
     // this.connectedPassword = val;
      //enterData.append('key','value');
    //   if ( enteroldpassword != enternewpassword) {
    //     //console.log("enter data", enterData);
    //     this.http.post('http://122.166.52.111/dbcon/changepassword.php', enterData, httpOptions)
    //   .subscribe(res =>  {
    //      // this.formData = res;

    //      console.log(res);
    //     },
    //     err => {
    //       console.log("Error occured", err);
    //     }
    //   );
    // }
    // else {
    //   console.log("Both passwords are same, please enter unique password")
    // }
    form.reset();
   // });
  }



}

