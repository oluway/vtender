import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TenderService } from '../services/tender.service';
import { Tender } from '../models/tender';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';







@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('section1') section1: ElementRef;
  isShown = true;
  showForm = false;
  isValidTender = false;
  inValidTender = false;
  spinner = false;
  validtend = true;
  ifEmpty = false;
  pointScore: any; applyCount: any; errorMsg: any;
  isTender: any; mydatas: any; name: any; operational: any;
  inputTenderNumber: string; tenderStatus: any; category: any; closingDate: any;
  tender: any; tenderNumber: any; tenderDescription: any; datePublished: any;
  nameOfInstitution: any; officalLocation: any; InstitutionContactPerson: any;
  InstitutionPersonEmail: any; InstitutionPersonPhone: any; companyArr: any;
  companyAddress: any; companyName: any; companyEmail: any; companyPhoneNumber: any;
  directors: any; winningCount: any; awardedPoint: any; companyRegistrationNo:any;
  formattedAddress: any; businessStatus: any; googleObj: any; googleAlert: any;
  post: [] = [];
  constructor(private tenderService: TenderService, private router: Router) {
         this.tender = [];
         this.errorMsg = 'Tender Number Required';
  }

  ngOnInit(): void {

  }
  open = () => {
    this.isShown = false;
    this.showForm = true;
    this.isShown = false;
  }

  veryfyTender = () => {
    if (typeof this.inputTenderNumber === 'undefined'){
      this.ifEmpty = true;
     } else {
    this.spinner = true;
    this.tenderService.getTender(this.inputTenderNumber).subscribe((resp) => {
      this.tender = resp;
      this.tenderNumber = this.tender[0].tenderNumber;
      this.tenderStatus = this.tender[0].tenderStatus;
      this.tenderDescription = this.tender[0].tenderDescription;
      this.category = this.tender[0].category;
      this.datePublished = this.tender[0].datePublished;
      this.closingDate = this.tender[0].closingDate;
      this.nameOfInstitution = this.tender[0].nameOfInstitution;
      this.officalLocation = this.tender[0].officalLocation;
      this.InstitutionContactPerson = this.tender[0].InstitutionContactPerson;
      this.InstitutionPersonEmail = this.tender[0].InstitutionPersonEmail;
      this.InstitutionPersonPhone = this.tender[0].InstitutionPersonPhone;
      this.companyArr = resp[0];
      this.checkTenderStatus(this.tenderStatus);

      // Getting winner from the company array
      const obj = this.companyArr.companies.find(win => win.isWinner === 'isWinner');
      this.companyAddress  = obj.companyAddress;
      this.companyName  = obj.companyName;
      this.companyEmail  = obj.companyEmail;
      this.companyPhoneNumber = obj.companyPhoneNumber;
      this.directors  = obj.directors;
      this.winningCount  = obj.winningCount;
      this.awardedPoint  = obj.awardedPoint;
      this.companyRegistrationNo = obj.companyRegistrationNo;
      console.log('We got it',  this.tender);
    });
  }
}


  checkTenderStatus(status) {
    switch (status) {
    case 'open': {
        this.spinner = true;
        this.isValidTender = true;
        this.showForm = false;
        this.validtend = false;
        this.spinner = false;
  }
    case 'awarded': {
      this.spinner = true;
      setTimeout(() => {
             // Getting winner information from google my business and analyse
              this.tenderService.verifyCompanyAddress(this.companyPhoneNumber).subscribe(data => {
              this.mydatas = data;
              this.name = this.mydatas.candidates[0].name;
              this.operational = this.mydatas.candidates[0].opening_hours.open_now;
              this.formattedAddress = this.mydatas.candidates[0].formatted_address;
              this.businessStatus =  this.mydatas.candidates[0].business_status;
              this.googleObj = this.mydatas.candidates;
              if (Object.keys(this.googleObj).length > 1) {
                this.googleAlert = 'Company phone is attached to more than one company';
                this.pointScore = 15.5;
              } else {
                this.googleAlert =  'passed vTender Google background check';
                this.pointScore = 48.5;
              }
              this.openDetailsWithState();
              console.log('YES WE KNOW ITS AWARDED', data);

      });
     }, 2000);
      break;
    }
      case 'pending': {

      break;
    }
    default: {
      this.inValidTender = true;
      this.showForm = false;
      this.validtend = false;
      this.tenderNumber = this.inputTenderNumber;
      break;
    }
}

}


openDetailsWithState() {
  const navigationExtras: NavigationExtras = {
    state: {
      data: {
        tenderNumber: this.tenderNumber,
        tenderStatus: this.tenderStatus,
        tenderDescription: this.tenderDescription,
        category: this.category,
        datePublished: this.datePublished,
        closingDate: this.closingDate,
        nameOfInstitution: this.nameOfInstitution,
        officalLocation: this.officalLocation,
        InstitutionContactPerson: this.InstitutionContactPerson,
        InstitutionPersonEmail: this.InstitutionPersonEmail,
        InstitutionPersonPhone: this.InstitutionPersonPhone,

        applyCount: this.applyCount,
        companyAddress: this.companyAddress,
        companyName: this.companyName,
        companyEmail: this.companyEmail,
        companyPhoneNumber: this.companyPhoneNumber,
        directors: this.directors,
        winningCount: this.winningCount,
        awardedPoint: this.awardedPoint,
        name: this.name,
        companyRegistrationNo: this.companyRegistrationNo,
        operational: this.operational,
        formattedAddress: this.formattedAddress,
        businessStatus: this.businessStatus,
        googleObj: this.googleObj,
        googleAlert: this.googleAlert,
        pointScore: this.pointScore
      }
    }
  };
  this.router.navigate(['awardedtender'], navigationExtras);
}

  reloadPage() {
    window.location.reload();
  }

}
