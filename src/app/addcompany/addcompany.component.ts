import { Component, OnInit } from '@angular/core';
import { TenderService } from '../services/tender.service';
import { Observable } from 'rxjs';
import { Tender } from '../models/tender';
import { Company } from '../models/company';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {
  companies: Company[];
  options = [
    { value: 'isWinner', label: 'YES - Is Winner' },
    { value: 'notWinner', label: 'NO - Not Winner' },
  ];
  isWinner: any;
  constructor(private tenderService: TenderService, private router: Router) {
            this.isWinner = this.options;
  }


  ngOnInit(): void {
  }
  createCompany(data: Company) {
    this.tenderService.createCompany(data.tenderNumber, data).subscribe(resp => {
       if (data){
        this.router.navigate(['/viewcompanies']);
       }
     });
  }
}
