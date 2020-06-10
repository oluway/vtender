import { Component, OnInit } from '@angular/core';
import { Tender } from '../models/tender';
import { Router, NavigationExtras } from '@angular/router';
import { TenderService } from '../services/tender.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-addtender',
  templateUrl: './addtender.component.html',
  styleUrls: ['./addtender.component.css']
})
export class AddtenderComponent implements OnInit {
  tenders: Tender[];
  tenderAdded = false;

  options = [
    { value: 'Open', label: 'Open Tender' },
    { value: 'Awarded', label: 'Awarded Tender' },
    { value: 'Pending', label: 'Pending' },
  ];

  tenderNumber: any; tenderDescription: any; category: any;
  InstitutionContactPerson: any; InstitutionPersonEmail: any;
  InstitutionPersonPhone: any; datePublished: any; closingDate: any;
  tenderStatus: any;
  constructor(private tenderService: TenderService, private router: Router) {
           this.tenderStatus = this.options;
   }
  ngOnInit(){
    this.getAllTenders();
  }
  getAllTenders() {
    this.tenderService.getTenders().subscribe(tenderData => {
      this.tenders = tenderData;
      console.log(this.tenders);
    });
  }
   // Add New user
   createTender(data: Tender) {
    this.tenderService.createTender(data).subscribe(res => {
      this.tenderAdded = true;
      this.getAllTenders();
      console.log('Tender has been added ', res);
    });
  }
  openDetailsWithState(data){
    const navigationExtras: NavigationExtras = {
      state: {
        data: {
          tenderNumber: data.tenderNumber,
          tenderStatus: data.tenderStatus,
          tenderDescription: data.tenderDescription,
          category: data.category,
          datePublished: data.datePublished,
          closingDate: data.closingDate,
          nameOfInstitution: data.nameOfInstitution,
          officalLocation: data.officalLocation,
          InstitutionContactPerson: data.InstitutionContactPerson,
          InstitutionPersonEmail: data.InstitutionPersonEmail,
          InstitutionPersonPhone: data.InstitutionPersonPhone
        }
      }
    };
    this.router.navigate(['edittender'], navigationExtras);
  }
  delete(data: Tender) {
   if (confirm('Are you sure to delete')){
    this.tenderService.deleteTender(data).subscribe((res) => {
      this.getAllTenders();
      console.log(`Tender number ${data} deleted ` + res);
    });
   }
}


}
