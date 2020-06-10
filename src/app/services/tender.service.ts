import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Tender } from '../models/tender';
import { Company } from '../models/company';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap, map, retry } from 'rxjs/operators';


export const googleAPIKey = environment.googleAPIKey;

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  companyUrl = 'https://team-279-api.herokuapp.com/api/companies';
  tendersUrl = 'https://team-279-api.herokuapp.com/api/tenders';

  constructor(private http: HttpClient) {

   }
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
   // Get all tenders
  getTenders(): Observable<Tender[]> {
    return this.http.get<Tender[]>(this.tendersUrl);
  }
  // Get single tender by Tender Number
  getTender(tenderNumb) {
    return this.http.get(`https://team-279-api.herokuapp.com/api/tender/${tenderNumb}`);
  }
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl);
  }
  getTenderByID(tenderID: any): Observable<Tender[]> {
    return this.http.get<Tender[]>(`https://team-279-api.herokuapp.com/api/single/tender/${tenderID}`);
  }
  getCompanyID(companyID: any): Observable<Company[]> {
    return this.http.get<Company[]>(`https://team-279-api.herokuapp.com/api/single/company/${companyID}`);
  }


  createTender(data) {
    return this.http.post('https://team-279-api.herokuapp.com/api/tender/create',  data);
  }
  createCompany(tenderNumb, formdata) {
    const url = `https://team-279-api.herokuapp.com/api/tender/${tenderNumb}/company`;
    return this.http.post(url, formdata);
  }
  updateTender(id, tenderData): Observable<Tender[]> {
    const url = `https://team-279-api.herokuapp.com/api/tender/${id}`;
    return this.http.patch<Tender[]>(url, tenderData);
  }
  updateCompany(id, companyData): Observable<Company[]>{
    const url = `https://team-279-api.herokuapp.com/api/company/${id}`;
    return this.http.patch<Company[]>(url, companyData);
  }

  deleteTender(data): Observable<Tender[]> {
    // const EncodedText = data.replace(/\//g, '%2F');
    const url = `https://team-279-api.herokuapp.com/api/tender/${data}`;
    return this.http.delete<Tender[]>(url);
  }
  deleteCompany(data): Observable<Company[]> {
    // const EncodedText = data.replace(/\//g, '%2F');
    const url = `https://team-279-api.herokuapp.com/api/company/${data}`;
    return this.http.delete<Company[]>(url);
  }

  verifyCompanyAddress(phone): Observable<Company[]> {
    const googleReq = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%2B27${phone}&inputtype=phonenumber&fields=business_status,formatted_address,name,permanently_closed,opening_hours&key=` + googleAPIKey;
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    return this.http.get<Company[]>(proxyurl + googleReq).pipe(
        retry(1)
   );
}

}
