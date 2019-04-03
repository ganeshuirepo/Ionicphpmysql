import { OldCircularPage } from './../old-circular/old-circular';

import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the SearchcircularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@IonicPage()
@Component({
  selector: 'page-searchcircular',
  templateUrl: 'searchcircular.html',
})

export class SearchcircularPage {

  displayCircular: boolean;
  //showData: boolean;
  circularsearchData: any;
  date: number;
  selectedData: Object;
  selectedYear: any;
  selectedDepartment: any;
  searchDatalist: any;
  lastyearminuseight: number;
  lastyearminusseven: number;
  lastyearminussix: number;
  lastyearminusfive: number;
  lastyearminusfour: number;
  lastyearminusthree: number;
  lastyearminustwo: number;
  lastyearminusone: number;
  lastyear: number;
  circularyearList: any;
  currentYear: number;
  isValid: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http   : HttpClient, private zone : NgZone) {

                this.date = new Date().getFullYear();
                this.currentYear = new Date().getFullYear();
                this.lastyear = this.currentYear - 1;
                this.lastyearminusone = this.currentYear - 2;
                this.lastyearminustwo = this.currentYear - 3;
                this.lastyearminusthree = this.currentYear - 4;
                this.lastyearminusfour = this.currentYear - 5;
                this.lastyearminusfive = this.currentYear - 6;
                this.lastyearminussix = this.currentYear - 7;
                this.lastyearminusseven = this.currentYear - 8;
                this.lastyearminuseight = this.currentYear - 9;
                this.selectedYear = "Select Year";
                this.selectedDepartment = "Select Department";
             //   console.log("constr",this.selectedYear);
  }

 onSubmit() {

  if (this.selectedYear == "Select Year") {
 //   console.log("selected year is",this.selectedYear );
    this.displayCircular = false;
  }
  else {
  // console.log("selected year else",this.selectedYear );
    let yearSelect = this.selectedYear;
    let yearDept = this.selectedDepartment;
    this.selectedData = {
      selectDepart: yearDept,
      selectyear: yearSelect

    }
    this.zone.run(() => {
    let selectData = JSON.stringify(this.selectedData);
  this.http.post('http://122.166.52.111/dbcon/retrieve-searchdata.php', selectData, httpOptions)
  .subscribe((searchresult : any) =>
  {
      console.dir(searchresult);
      this.circularsearchData = searchresult;
      if (this.circularsearchData != null) {
        this.openPage(this.circularsearchData);

      } else {
        this.displayCircular = true;
      }
      //  this.searchresult = searchdata.map((item)=> {
      //    let data =  this.olddata[item];

      //   console.log("old data is:",this.searchresult)
      // })
  },
    err => {
      console.log("Error occured", err);
    }

  );
  });
  //console.log("circular search data", this.circularsearchData);
 // console.log("selected Date", selectData);

this.selectedYear = "Select Year";
this.selectedDepartment = "Select Department";
}
}
openPage(item){
  this.navCtrl.push(OldCircularPage, {
    oldCirclarData: item
  });
  //this.displayCircular = true;
}
}



