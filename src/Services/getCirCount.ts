import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class GetCirCountService {


  private dayCount = 'http://122.166.52.111/dbcon/retrieve-daycircularcount.php';
  private monthCount = 'http://122.166.52.111/dbcon/retrieve-monthcircularcount.php';
  private lastMonthCount = 'http://122.166.52.111/dbcon/retrieve-lastmonthcircularcount.php';
  private weekCount = 'http://122.166.52.111/dbcon/retrieve-weekcircularcount.php';
  private favcount = 'http://122.166.52.111/dbcon/retrieve-favcircularcount.php';
  private mastercount = 'http://122.166.52.111/dbcon/retrieve-mastercircularcount.php';

  constructor(private http: HttpClient) {

   }

  getDayCount() : Observable<any[]> {
    return this.http.get<any[]>(this.dayCount)
    .pipe(tap(daydata => console.dir("Day Count is:" + JSON.stringify(daydata[0].circulardayct))),
    catchError(this.handleError));
  }

  getMonthCount() : Observable<any[]> {
    return this.http.get<any[]>(this.monthCount)
    .pipe(tap(monthdata => console.dir("Month Count is:" + JSON.stringify(monthdata[0].circularmonthct))),
    catchError(this.handleError));
  }

  getLastMonthCount() : Observable<any[]> {
    return this.http.get<any[]>(this.lastMonthCount)
    .pipe(tap(lmonthdata => console.dir("Last Month Count is:" + JSON.stringify(lmonthdata[0].circularlastmonthct))),
    catchError(this.handleError));
  }

  getWeekCount() : Observable<any[]> {
    return this.http.get<any[]>(this.weekCount)
    .pipe(tap(weekdata => console.dir("Week Count is:" + JSON.stringify(weekdata[0].circularweekct))),
    catchError(this.handleError));
  }

  postFavCount(empData) : Observable<any[]> {
    return this.http.post<any[]>(this.favcount, empData, httpOptions)
    .pipe(tap(favdata => console.dir("Fav Count is:" + JSON.stringify(favdata[0].circularfavct))),
    catchError(this.handleError));
  }

  getMasterCount() : Observable<any[]> {
    return this.http.get<any[]>(this.mastercount)
    .pipe(tap(masterdata => console.dir("Master Count is:" + JSON.stringify(masterdata[0].circularmasterct))),
    catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
}
}
