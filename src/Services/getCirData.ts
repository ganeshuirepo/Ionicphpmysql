import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class GetCirDataService {

  private dayCircular = 'http://122.166.52.111/dbcon/retreive-todaycircular.php';
  private monthCircular = 'http://122.166.52.111/dbcon/retreive-monthcircular.php';
  private lastMonthCircular = 'http://localhost:8080/dbcon/retreive-lastmonthcircular.php';
  private weekCircular = 'http://122.166.52.111/dbcon/retreive-weekcircular.php';
  private favCircular = 'http://122.166.52.111/dbcon/retreive-favcircular.php';
  private masterCircular = 'http://122.166.52.111/dbcon/retreive-mastercircular.php';


constructor(private http: HttpClient) { }

getDayCircular() : Observable<any[]> {
  return this.http.get<any[]>(this.dayCircular)
  .pipe(tap(daydata => console.dir("Day Circular is:" + JSON.stringify(daydata))),
  catchError(this.handleError));
}

getMonthCircular() : Observable<any> {
  return this.http.get<any>(this.monthCircular)
  .pipe(tap(monthcirdata => console.dir(monthcirdata)),
  catchError(this.handleError));
}

getLastMonthCircular() : Observable<any[]> {
  return this.http.get<any[]>(this.lastMonthCircular)
  .pipe(tap(lmonthdata => console.dir("Last Month Circular is:" + JSON.stringify(lmonthdata))),
  catchError(this.handleError));
}

getWeekCircular() : Observable<any[]> {
  return this.http.get<any[]>(this.weekCircular)
  .pipe(tap(weekdata => console.dir("Week Circular is:" + JSON.stringify(weekdata))),
  catchError(this.handleError));
}

getFavCircular() : Observable<any[]> {
  return this.http.get<any[]>(this.favCircular)
  .pipe(tap(favdata => console.dir("Fav Circular is:" + JSON.stringify(favdata))),
  catchError(this.handleError));
}

getMasterCircular() : Observable<any[]> {
  return this.http.get<any[]>(this.masterCircular)
  .pipe(tap(masterdata => console.dir("Master Circular is:" + JSON.stringify(masterdata))),
  catchError(this.handleError));
}


private handleError(err: HttpErrorResponse) {
  console.error(err.message);
  return Observable.throw(err.message);
}

}
