import { Component } from '@angular/core';
import { TenderserviceService } from '../services/tenderservice.service';
import { LoadingController } from '@ionic/angular';
import { Tender } from '../tendermodel/tender';
import { Router, NavigationExtras } from '@angular/router';
import { Company } from '../companymodel/company';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inputTenderNumber: any;
  tenders: Tender[];
  companies: Company[];
  validTender = false;
  ifEmpty = false;
  vtender = true;
  inValidTender = false;
  pending = false;
  errorMsg: string;

  data: any;
  operational: any;
  businessStatus: any;
  name: any; Alert: any;
  mydatas: any;

  formattedAddress: any; googleObj: any; pointScore: any; transparency: any;
  tenderDescription: any; category: any;  closingDate: any;  datePublished: any; nameOfInstitution: any;
  InstitutionContactPerson: any; InstitutionPersonEmail: any;  InstitutionPersonPhone: any;
  officalLocation: any;  tenderStatus: any;  tenderNumber: any;  winner: any; applyCount: any;
  companyRegistrationNo: any; companyAddress: any;  companyName: any;  companyEmail: any;
  companyPhoneNumber: any;  directors: any;  winningCount: any;  awardedPoint: any;
  totalScore: any; googleAlert: any;
  string; companyArr: any;

  constructor(private tenderService: TenderserviceService, private router: Router,
              public loadingController: LoadingController) {
          this.errorMsg = 'Tender Number Required';
  }
  ionViewWillEnter() {
  }

  doRefresh() {
    this.vtender = true;
    this.inValidTender = false;
  }

    verify() {
     if (typeof this.inputTenderNumber === 'undefined'){
      this.ifEmpty = true;
     } else {
      this.tenderService.getTenders(this.inputTenderNumber).subscribe( tenderData => {

        this.tenders = tenderData;
        this.tenderNumber = this.tenders[0].tenderNumber;
        this.tenderStatus = this.tenders[0].tenderStatus;
        this.tenderDescription = this.tenders[0].tenderDescription;
        this.category = this.tenders[0].category;
        this.datePublished = this.tenders[0].datePublished;
        this.closingDate = this.tenders[0].closingDate;
        this.nameOfInstitution = this.tenders[0].nameOfInstitution;
        this.officalLocation = this.tenders[0].officalLocation;
        this.InstitutionContactPerson = this.tenders[0].InstitutionContactPerson;
        this.InstitutionPersonEmail = this.tenders[0].InstitutionPersonEmail;
        this.InstitutionPersonPhone = this.tenders[0].InstitutionPersonPhone;
        this.companyArr = tenderData[0];
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
        this.presentLoading();
      });

     }
  }

    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Fetching Tender Please Wait...',
        duration: 3000
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();
    }
    async inValidpresentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Checking Tender Number...',
        duration: 1000
      });
      await loading.present();
      this.tenderNumber = this.inputTenderNumber;
      this.vtender = false;
      this.inValidTender = true;
      const { role, data } = await loading.onDidDismiss();
    }
    
    checkTenderStatus(status) {
          switch (status) {
          case 'open': {
              this.presentLoading();
              this.validTender = true;
              this.vtender = false;
              break;
        }
          case 'awarded': {
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
            });

            console.log('YES WE KNOW ITS AWARDED');
            }, 3000);
            break;
          }
            case 'pending': {
            this.pending = true;
            this.vtender = false;
            break;
          }
          default: {
            this.inValidpresentLoading();
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
    this.router.navigate(['tenderview'], navigationExtras);
  }

  refreshPage() {
    this.vtender = true;
    this.validTender = false;
  }
}
