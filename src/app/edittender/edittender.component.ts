import { Component, OnInit, } from '@angular/core';
import { TenderService } from '../services/tender.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tender } from '../models/tender';

@Component({
  selector: 'app-edittender',
  // template: '<pre>{{ state$ | async | json }}</pre>',
  templateUrl: './edittender.component.html',
  styleUrls: ['./edittender.component.css']
})
export class EdittenderComponent implements OnInit {
   tenderObject: Tender[];
   state$: Observable<object>; InstitutionPersonPhone: any;
   tenderID: any; tenderDescription: any; datePublished: any;
   tenderInfo: any; category: any; tenderStatus: any; closingDate: any;
   InstitutionContactPerson: any; InstitutionPersonEmail: any;
   updatedData: any;
   options = [
    { value: 'Open', label: 'Open Tender' },
    { value: 'Awarded', label: 'Awarded Tender' },
    { value: 'Pending', label: 'Pending' },
  ];
  constructor(private tenderService: TenderService,
              private router: Router, private route: ActivatedRoute) {
                this.tenderStatus = this.options;
                this.route.queryParams.subscribe(params => {
                if (this.router.getCurrentNavigation().extras.state) {
                  this.tenderID = this.router.getCurrentNavigation().extras.state.data;
                }
    });
   }


  ngOnInit(): void {
    this.tenderInfo = new Tender();
    this.tenderService.getTenderByID(this.tenderID).subscribe(data => {
      this.tenderObject = data;
      this.tenderInfo = this.tenderObject[0].tenderNumber;
      this.category = this.tenderObject[0].category;
      this.tenderStatus = this.tenderObject[0].tenderStatus;
      this.tenderDescription = this.tenderObject[0].tenderDescription;
      this.datePublished = this.tenderObject[0].datePublished;
      this.closingDate = this.tenderObject[0].closingDate;
      this.InstitutionContactPerson = this.tenderObject[0].InstitutionContactPerson;
      this.InstitutionPersonEmail = this.tenderObject[0].InstitutionPersonEmail;
      this.InstitutionPersonPhone = this.tenderObject[0].InstitutionPersonPhone;

      console.log('We got tender ', this.tenderObject);
    }, error => console.log(error));
  }

  updateTender(updatedTender) {
    this.tenderService.updateTender(this.tenderID, updatedTender)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoTenderList();
    console.log('Updated Tender: ', updatedTender);
  }


  gotoTenderList() {
    this.router.navigate(['/addtender']);
  }

}
