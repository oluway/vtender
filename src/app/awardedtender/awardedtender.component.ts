import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-awardedtender',
  // template: '<pre>{{ state$ | async | json }}</pre>',
  templateUrl: './awardedtender.component.html',
  styleUrls: ['./awardedtender.component.css']
})
export class AwardedtenderComponent implements OnInit {
  state$: Observable<object>; data: any; businessStatus: any; name: any; Alert: any;
  formattedAddress: any; googleObj: any; pointScore: any; transparency: any;
    tenderDescription: any; category: any; closingDate: any; datePublished: any; nameOfInstitution;
    InstitutionContactPerson: any; InstitutionPersonEmail: any; InstitutionPersonPhone;
    officalLocation: any; tenderStatus: any; tenderNumber: any; winner: any; applyCount: any;
    companyRegistrationNo: any; companyAddress: any; companyName: any; companyEmail: any;
    companyPhoneNumber: any; directors: any; winningCount: any; awardedPoint: any; totalScore: any;
    vtenderAnalysisScore: any;  googleAlert: any; operational: any;
  constructor(private router: Router, private route: ActivatedRoute) {
                    this.route.queryParams.subscribe(params => {
                      if (this.router.getCurrentNavigation().extras.state) {

                        this.data = this.router.getCurrentNavigation().extras.state.data;
                        this.tenderNumber = this.data.tenderNumber;
                        this.tenderStatus = this.data.tenderStatus;
                        this.tenderDescription = this.data.tenderDescription;
                        this.category = this.data.category;
                        this.datePublished = this.data.datePublished;
                        this.closingDate = this.data.closingDate;
                        this.nameOfInstitution = this.data.nameOfInstitution;
                        this.officalLocation = this.data.officalLocation;
                        this.InstitutionContactPerson = this.data.InstitutionContactPerson;
                        this.InstitutionPersonEmail = this.data.InstitutionPersonEmail;
                        this.InstitutionPersonPhone = this.data.InstitutionPersonPhone;
                        // Company information
                        this.companyAddress  = this.data.companyAddress;
                        this.companyName  = this.data.companyName;
                        this.companyEmail  = this.data.companyEmail;
                        this.companyPhoneNumber = this.data.companyPhoneNumber;
                        this.directors  = this.data.directors;
                        this.winningCount  = 1;
                        this.awardedPoint  = this.data.awardedPoint;
                        this.companyRegistrationNo = this.data.companyRegistrationNo.substr(0, 4);
                        // Google report
                        this.operational = this.data.operational;
                        this.formattedAddress = this.data.formattedAddress;
                        this.businessStatus = this.data.businessStatus;
                        this.googleObj = this.data.googleObj;
                        this.pointScore = this.data.pointScore;
                        this.name = this.data.name;
                        this.googleAlert = this.data.googleAlert;
                        this.applyCount = this.data.applyCount;
                      }
                });
   }

  ngOnInit(): void {
    this.getTotalScore();
  }
  vTenderAnalysis() {
    this.applyCount = 5;
    if (this.applyCount === this.winningCount){
              this.Alert = 'vTender suspect a Tender Fraud';
              return  this.vtenderAnalysisScore = 0;
  } else if ((this.applyCount >= 3 || this.applyCount <= 10) && (this.winningCount >= 3)) {
              this.Alert = 'vTender suspect a Tender Fraud';
              return this.vtenderAnalysisScore = 0;
  } else if ((this.applyCount >= 11 || this.applyCount <= 30) && (this.winningCount >= 8)){
              this.Alert = 'vTender suspect a Tender Fraud';
              return this.vtenderAnalysisScore = 0;
  } else if ((this.applyCount >= 31 || this.applyCount <= 60) && (this.winningCount >= 14)){
              this.Alert = 'vTender suspect a Tender Fraud';
              return this.vtenderAnalysisScore = 0;
  } else if ((this.applyCount >= 61 || this.applyCount <= 120) && (this.winningCount >= 24)){
              this.Alert = 'vTender suspect a Tender Fraud';
              return this.vtenderAnalysisScore = 0;
  } else if ((this.applyCount >= 121 || this.applyCount <= 300) && (this.winningCount >= 40)){
              this.Alert = 'vTender suspect a Tender Fraud';
              return this.vtenderAnalysisScore = 0;
  }else {
              this.Alert = `${this.companyName} passed vTender analysis check`;
              return this.vtenderAnalysisScore = 48.5;
  }
  }

    getTotalScore() {
        this.totalScore = this.vTenderAnalysis() + this.pointScore;
    }
}
