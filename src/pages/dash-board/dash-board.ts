import { GetCirCountService } from './../../Services/getCirCount';
import { LastMonthCircularPage } from './../last-month-circular/last-month-circular';
import { DepartmentListPage } from './../department-list/department-list';
import { FavdetailsPage } from './../favdetails/favdetails';
import { MasterCircularPage } from './../master-circular/master-circular';
import { SearchcircularPage } from './../searchcircular/searchcircular';
import { MonthcircularPage } from './../monthcircular/monthcircular';
import { TodaycircularPage } from './../todaycircular/todaycircular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { WeekcircularPage } from '../weekcircular/weekcircular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DashBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-dash-board',
  templateUrl: 'dash-board.html'
})
export class DashBoardPage {
  lastcircularmonthCount: any;
  connectedUsername: any;
  department: { departmentTarget: any; }[];
  items: { title: string; img: string; badge: any; target: any; }[];
  connectedUser: any;
  circularmasterCount: number;
  circularfavdatacount: number;
  employeeID: { empno: any; };
  favdetailsPage: any;
  mastercircularPage: any;
  weekcircularPage: any;
  todaycircularPage: any;
  monthcircularPage: any;
  oldcircularPage: any;
  searchcircularPage: any;
  circularmonthCount: number;
  circularweekCount: number;
  circulardayCount: number;
  departmentSearchList: any;
  lastmonthCircularPage: any;
  errorMessage : string;

  loadData: boolean;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient, public storage: Storage,
              public toastCtrl: ToastController, public app: App,
              private circularCount: GetCirCountService) {

                // console.log("username", this.connectedUsername);
               //   this.storage.get('empname').then((val) => {
               //    this.connectedUsername = val;
               //  });
    //this.connectedUsername = localStorage.getItem('empname');
     this.monthcircularPage = MonthcircularPage;
    this.weekcircularPage = WeekcircularPage;
    this.todaycircularPage = TodaycircularPage;
    this.searchcircularPage = SearchcircularPage;
    this.mastercircularPage = MasterCircularPage;
    this.favdetailsPage = FavdetailsPage;
    this.departmentSearchList = DepartmentListPage;
    this.lastmonthCircularPage = LastMonthCircularPage;
    this.loadData = true;
  }


  ionViewWillEnter() : void {
     this.load();
  }



  load(): void {
    let nav = this.app.getActiveNavs()[0];
    let activeView = nav.getActive();
      this.platform.registerBackButtonAction(() => {
        let viewName = this.navCtrl.getActive().name;
       if (this.navCtrl.canGoBack() && activeView.name !== viewName) {
        this.navCtrl.pop();
       }  else {
        if (activeView.name == viewName || activeView.name === 'ChangepaswordPage') {
          nav.setRoot(DashBoardPage);
        } else {
          this.platform.exitApp();
        }
        // IF IT'S THE ROOT, EXIT THE APP.
      }
     });

     let empId = localStorage.getItem('empid');
     this.employeeID = {
       empno: empId
     }
     let empData = JSON.stringify(this.employeeID);

     this.circularCount.getDayCount()
     .subscribe(cirdaydata => this.circulardayCount = cirdaydata[0].circulardayct,
                  error => this.errorMessage = <any>error);
    this.circularCount.getMonthCount()
     .subscribe(cirmonthdata => this.circularmonthCount = cirmonthdata[0].circularmonthct,
                  error => this.errorMessage = <any>error);
    this.circularCount.getLastMonthCount()
     .subscribe(cirlmonthdata => this.lastcircularmonthCount = cirlmonthdata[0].circularlastmonthct,
                  error => this.errorMessage = <any>error);
    this.circularCount.getWeekCount()
     .subscribe(cirweekdata => this.circularweekCount = cirweekdata[0].circularweekct,
                  error => this.errorMessage = <any>error);

    this.circularCount.postFavCount(empData)
     .subscribe(cirfavdata => this.circularfavdatacount = cirfavdata[0].circularfavct,
                  error => this.errorMessage = <any>error);
    this.circularCount.getMasterCount()
     .subscribe(cirmasterdata => this.circularmasterCount = cirmasterdata[0].circularmasterct,
                  error => this.errorMessage = <any>error);
    this.loadData = false;
     //this.zone.run(() => {
      // this.http
      // .get('http://122.166.52.111/dbcon/retrieve-mastercircularcount.php')
      // .subscribe((masterdatacount: any) => {
      //   console.dir(masterdatacount);
      //   this.circularmasterCount = masterdatacount[0].circularmasterct;
      //
      // },
      //   (error: any) => {
      //     console.dir(error);
      //   });
      // this.http
      //   .get('http://122.166.52.111/dbcon/retrieve-monthcircularcount.php')
      //   .subscribe((monthdatacount: any) => {
      //     console.dir(monthdatacount);
      //     this.circularmonthCount = monthdatacount[0].circularmonthct;
      //   },
      //     (error: any) => {
      //       console.dir(error);
      //     });

      // this.http
      //   .get('http://122.166.52.111/dbcon/retrieve-lastmonthcircularcount.php')
      //   .subscribe((lastmonthdatacount: any) => {
      //     console.dir(lastmonthdatacount);
      //     this.lastcircularmonthCount = lastmonthdatacount[0].circularmonthct;
      //   },
      //     (error: any) => {
      //       console.dir(error);
      //     });

      // this.http
      //   .get('http://122.166.52.111/dbcon/retrieve-weekcircularcount.php')
      //   .subscribe((weekdatacount: any) => {
      //     console.dir(weekdatacount);

      //     // console.log("the log is:",weekdatacount[0].circularweekct);
      //     this.circularweekCount = weekdatacount[0].circularweekct;

      //   },
      //     (error: any) => {
      //       console.dir(error);
      //     });



      // this.http
      //   .get('http://122.166.52.111/dbcon/retrieve-daycircularcount.php')
      //   .subscribe((daydatacount: any) => {
      //     console.dir(daydatacount);
      //     this.circulardayCount = daydatacount[0].circulardayct;
      //   },
      //     (error: any) => {
      //       console.dir(error);
      //     });


      // {

      //     //console.log("employee ID", this.employeeID);
      //     this.http
      //       .post('http://122.166.52.111/dbcon/retrieve-favcircularcount.php', empData, httpOptions)
      //       .subscribe((favdatacount: any) => {
      //         console.dir(favdatacount);
      //         this.circularfavdatacount = favdatacount[0].circularfavct;
      //       },
      //         (error: any) => {
      //           console.dir(error);
      //         });
      // }


   // });
  }
  navPage(target) {
    this.navCtrl.push(target)
  }

  navigatePage(departmentTarget) {
    this.navCtrl.push(departmentTarget)
  }

  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);

    this.load();
    setTimeout(() => {
      // console.log('Async operation has ended');
      refresher.complete();
      this.presentToast('Dashboard refreshed!!', 1500)

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
