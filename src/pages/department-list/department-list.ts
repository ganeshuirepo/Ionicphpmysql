import { DepartmentDisplaycircularPage } from './../department-displaycircular/department-displaycircular';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the DepartmentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@IonicPage()
@Component({
  selector: 'page-department-list',
  templateUrl: 'department-list.html',
})
export class DepartmentListPage {

  circulardeptData: any;
  selectedDepartment: any;
  selectedData: any;
  isValid: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http   : HttpClient, private zone : NgZone) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DepartmentListPage');
  // }
  onSubmit() {

    if (this.selectedDepartment == "Select Department") {
      //console.log("selected if is",this.selectedDepartment );
      this.isValid = false;
    }
    else {
    //  console.log("selected dept else",this.selectedDepartment );
    //  console.log("selected Dept Data", this.selectedData)
      let yearDept = this.selectedDepartment;
      this.selectedData = {
        selectDepart: yearDept
      }


      let selectData = JSON.stringify(this.selectedData);
    this.zone.run(() => {
      this.http.post('http://122.166.52.111/dbcon/retreive-departmentList.php', selectData, httpOptions)
      .subscribe((departmentdata : any) =>
      {
          console.dir(departmentdata);
          this.circulardeptData = departmentdata;
          if (this.circulardeptData != null) {
            this.openPage(this.circulardeptData);

          } else {
            this.isValid = true;
          }
      },
        err => {
          console.log("Error occured", err);
        }
      );
    });


   // console.log("selected Date", this.circulardeptData);

    this.selectedDepartment = "Select Department";
  }
}
  openPage(item){
    this.navCtrl.push(DepartmentDisplaycircularPage, {
      deptCirclarData: item
    });
    //this.displayCircular = true;
  }
   }

