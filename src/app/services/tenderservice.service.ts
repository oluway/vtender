import { Injectable } from '@angular/core';
import { Tender } from '../tendermodel/tender';
import { Company } from '../companymodel/company';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export const googleAPIKey = environment.googleAPIKey;


@Injectable({
  providedIn: 'root'
})
export class TenderserviceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  tendersUrl = '';

  constructor(private http: HttpClient) { }
// Handle API errors

  handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage....: ${error.message}`;
        }
        return throwError(errorMessage);
      }

  checkTenders(): Observable<Tender[]> {
        return this.http.get<Tender[]>(`https://team-279-api.herokuapp.com/api/tenders`);
      }

  getTenders(tenderNumb): Observable<Tender[]> {
          return this.http.get<Tender[]>(`https://team-279-api.herokuapp.com/api/tender/${tenderNumb}`)
          .pipe(
            retry(1)
       );
    }
  verifyCompanyAddress(phone): Observable<Company[]> {
    const googleReq = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%2B27${phone}&inputtype=phonenumber&fields=business_status,formatted_address,name,permanently_closed,opening_hours&key=` + googleAPIKey;
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    return this.http.get<Company[]>(proxyurl + googleReq).pipe(
        retry(1)
   );

      // fetch(proxyurl + this.googleReq)
      // .then(response => response.json())
      // .then(contents => console.log(contents));
 }
}
