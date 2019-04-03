import { DashBoardPage } from './../dash-board/dash-board';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavParams, NavController, Events, ToastController } from 'ionic-angular';
import { regexValidators } from '../validators/validator';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // isLoginSuccess: boolean;
  // connectedUser: any;
  appName: any;
  connectedUsername: any;
  isLoggedin: boolean;
  appPassword: any;
  appempID: any;
  empiddata: any;
  dbpassword: any;
  loginValidation: FormGroup;
  dashBoardPage: any;
  public items: Array<any> = [];
  list: string[];
  iterate: any;
  employeeid: any;
  dbempid: any;
  dbusername: any;
  registerPage: any;
  @Output() username = new EventEmitter();

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    private formBuilder: FormBuilder, public http: HttpClient,
    public storage: Storage, public events: Events) {
    //this.verifyUser(this.usermail);
    // this.setEmail();
    // this.getEmail();
    this.isLoggedin = true;
    this.dashBoardPage = DashBoardPage;
    this.registerPage = RegisterPage;

    this.loginValidation = this.formBuilder.group({
      empid: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      Password: [
        '', Validators.compose([
          Validators.pattern(regexValidators.password),
          Validators.required
        ])
      ]
    });
  }

  presentToast(myMessage, time) {
    let toast = this.toastCtrl.create({
      message: myMessage,
      duration: time
    });
    toast.present();
  }

  ionViewWillEnter(): void {
    // this.load();
  }

  verifyUser(form: NgForm) {

    let enterData = form.value;
    let enterempid = enterData['empid'];
    let enterpassword = enterData['Password'];
    this.http
      .get('http://122.166.52.111/dbcon/registerapp-data.php')
      .subscribe((empdata: any) => {
        console.dir(empdata);
        this.empiddata = empdata;

        var empDetail = this.empiddata.find(x => x.Emp_id === enterempid);
        console.log(empDetail);


        if(empDetail){
          if (enterpassword == empDetail.password) {
                localStorage.setItem('loggedIn', 'true')
                localStorage.setItem('empid', empDetail.Emp_id)
                localStorage.setItem('empname', empDetail.Emp_name);

                this.navCtrl.push(this.dashBoardPage);
                form.reset();
                this.presentToast('login successfull', 1000)

        }else{
        this.presentToast('Invalid Employee Id and password', 2000)

        }
      }else{
        this.presentToast('Invalid Employee Id and password', 2000)

      }




      },
        (error: any) => {
          console.dir(error);
        });
  }

  //verifyUser(form: NgForm) {

    // this.empiddata.map((success) => {

    //   this.appempID = success['Emp_id'];
    //   this.appPassword = success['password'];
    //   this.appName = success['Emp_name'];

    //   // Object.setPrototypeOf(enterData, evalue);
    //   // Object.keys(evalue);
    //   // console.dir(evalue);

    //   if (this.appempID == enterempid) {
    //     if (this.appPassword == enterpassword) {
    //       this.storage.get('empname').then((val) => {
    //         localStorage.setItem('loggedIn', 'true')
    //         localStorage.setItem('empid', this.appempID)
    //         localStorage.setItem('empname', this.appName);
    //         this.connectedUser = val;
    //         console.log(this.connectedUser)
    //         //console.log("username within get",this.connectedUser);
    //       });
    //       this.isLoginSuccess = true;

    //       this.navCtrl.push(this.dashBoardPage);
    //     }
    //   } else {

    //     this.isLoggedin = false;

    //   }




    // })

   // this.load();





//}

}
