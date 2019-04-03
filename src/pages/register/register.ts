import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { DashBoardPage } from '../dash-board/dash-board';
import { regexValidators } from '../validators/validator';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loginPage: typeof LoginPage;
  dbpassword: any;
  dbusername: any;
  dashBoardPage: any;
  //isDataValid: boolean;
  appempid: any;
  empiddata: any;
  enterempdob: string;
  dbempname: any;
  dbempmobile: any;
  dbempbranch: any;
  dbempdob: any;
  empValidation: any;
  dbempid: any;
  public items : Array<any> = [];
  registerdate: any;
  myDate: String = new Date().toDateString();


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, public http   : HttpClient,
              public storage: Storage, public toastCtrl: ToastController) {
                this.dashBoardPage = DashBoardPage;
                this.loginPage = LoginPage;
              //  this.myDate = "Select Date";
    this.empValidation = this.formBuilder.group({
    empid: [
      '', Validators.compose([
          Validators.pattern(regexValidators.number),
          Validators.required])
          ],
    emailid: [
      '', Validators.compose([
          Validators.pattern(regexValidators.email),
          Validators.required])
          ],
    empname: [
      '', Validators.compose([
          Validators.required])
          ],
    empmobile: [
      '', Validators.compose([
          Validators.pattern(regexValidators.mobile),
          Validators.required])
          ],
    empbranch: [
      '', Validators.compose([
          Validators.pattern(regexValidators.number),
          Validators.required])
          ]
          ,
    empdob: [
      '', Validators.compose([
          Validators.required])
          ],

      });
  }

  ionViewWillEnter() : void
  {
     this.load();
  }

  load() : void
   {
      this.http
      .get('http://122.166.52.111/dbcon/register-data.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });

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

   presentToast(myMessage, time) {
    let toast = this.toastCtrl.create({
      message: myMessage,
      duration: time
    });
    toast.present();
  }

  verifyUser(form: NgForm) {
    let enterData = form.value;

    // this.registerdate = new Date();
    // this.registerdate("dd, mm, yyyy");
    // console.log("register date: ",this.registerdate );
    let enterempid = enterData['empid'];
    //let enterempmobile = enterData['empmobile'];
    //let enterempbranch = enterData['empbranch'];
    //this.enterempdob = enterData['empdob'];
   // console.log("The data is", this.empiddata);
    //console.log("The item is", this.items);
    var empidDetail = this.empiddata.find(x => x.Emp_id === enterempid);
    var empDetail = this.items.filter(x => x.Emp_id == enterempid);
    // this.empiddata.map((iditem) => {
    //   Object.setPrototypeOf(enterData, iditem);
    //   Object.keys(iditem);
      //this.appempid = iditem['Emp_id'];

     // console.log("this is date", this.myDate);


     console.log("EMP details",this.items.filter(x => x.Emp_id == enterempid));
      if (empidDetail) {
        this.presentToast('The employee is already registered', 2000);
      } else if (empDetail.length > 0) {
        this.http.post('http://122.166.52.111/dbcon/postregister-data.php', enterData, httpOptions)
        .subscribe(res =>  {
           console.dir(res);

       // this.isDataValid = true;
        this.navCtrl.push(this.loginPage);
        this.presentToast('Registration successfull', 1000);
          },
          err => {
            console.log("Error occured", err);
          });

      } else {
      this.presentToast('Kindly enter valid Employee ID', 2000);
      }

      form.reset();

    // this.items.map((item) => {
    // Object.setPrototypeOf(enterData, item);
    // Object.keys(item);
    // this.dbempid = item['Emp_id'];
    // this.dbempname = item['Emp_name'];
    // this.dbempmobile = item['mobile_no'];
    // this.dbempbranch = item['Branch_no'];
    // this.dbempdob = item['dob'];

    //console.log("Enter Data within first loop", enterData)

    //let enterempid = enterData['empid'];
   // let enterempname = enterData['empname'];


   // if (empDetail) {
      //  console.log("Employee name is matched")
       // if(this.dbempmobile == enterempmobile) {
         // console.log("Employee mobile is matched")
        //  if(this.dbempbranch == enterempbranch) {
        //    console.log("Employee branch is matched")
     //       console.log("Enter Data within loop", enterData)
       // if (this.dbempdob == this.enterempdob) {


    //  }
 // }
    // else {
    // // console.log("The details are not matched");
    // }

    }


}
