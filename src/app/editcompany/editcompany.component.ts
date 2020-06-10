import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { TenderService } from '../services/tender.service';
import { Observable } from 'rxjs';
import { Company } from '../models/company';



@Component({
  selector: 'app-editcompany',
  // template: '<pre>{{ state$ | async | json }}</pre>',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css']
})
export class EditcompanyComponent implements OnInit {
  companyInfo: Company[]; companyData: any;
  companyID: any; state$: Observable<object>;
  options = [
    { value: 'isWinner', label: 'YES - Is Winner' },
    { value: 'notWinner', label: 'NO - Not Winner' },
  ];
    // tslint:disable-next-line: variable-name
  _id: number;  isWinner: any;  tenderNumber: string;
  companyName: string; companyRegistrationNo: string;
  companyPhoneNumber: string; companyAddress: string;
  directors: string; winningcount: number; awardedPoint: number;
  createDate: string; companyEmail: string;

  constructor(private tenderService: TenderService,
              private router: Router, private route: ActivatedRoute) {
                this.isWinner = this.options;
                this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.companyID = this.router.getCurrentNavigation().extras.state.data;
        console.log('We have company id ', this.companyID);
      }
});
   }

  ngOnInit(): void {
    this.companyData = new Company();
    this.tenderService.getCompanyID(this.companyID).subscribe(data => {
      this.companyData = data[0];
      this.tenderNumber = data[0].tenderNumber;
      this.isWinner = data[0].isWinner;
      this.companyName = data[0].companyName;
      this.companyRegistrationNo = data[0].companyRegistrationNo;
      this.companyPhoneNumber = data[0].companyPhoneNumber;
      this.companyAddress = data[0].companyAddress;
      this.directors = data[0].directors;
      this.awardedPoint = data[0].awardedPoint;
      this.companyEmail = data[0].companyEmail;

      console.log('We got tender ',  this.tenderNumber);
    }, error => console.log(error));
  }

  updateCompany(updatedData) {
    this.tenderService.updateCompany(this.companyID, updatedData)
      .subscribe(data => console.log('Data Updated ', data), error => console.log(error));
    this.gotoCompanyList();
  }


  gotoCompanyList() {
    this.router.navigate(['/viewcompanies']);
  }


}
