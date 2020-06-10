import { Component, OnInit } from '@angular/core';
import { TenderService } from '../services/tender.service';
import { Tender } from '../models/tender';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-tenderlist',
  templateUrl: './tenderlist.component.html',
  styleUrls: ['./tenderlist.component.css']
})
export class TenderlistComponent implements OnInit {
  tenders: Tender[];
  tenderNumber: any; tenderDescription: any; category: any;
  InstitutionContactPerson: any; InstitutionPersonEmail: any;
  nameOfInstitution: any; datePublished: any; closingDate: any;
  tenderStatus: any;
          constructor(private tenderService: TenderService) {

   }

  ngOnInit(): void {
    this.tenderService.getTenders().subscribe(tenderData => {
      this.tenders = tenderData;
      console.log(tenderData);
});
  }

}
