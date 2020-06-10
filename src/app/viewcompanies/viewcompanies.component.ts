import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { TenderService } from '../services/tender.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-viewcompanies',
  templateUrl: './viewcompanies.component.html',
  styleUrls: ['./viewcompanies.component.css']
})
export class ViewcompaniesComponent implements OnInit {
  companies: Company[];

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }
  getAllCompanies() {
    this.tenderService.getCompanies().subscribe(companyData => {
      this.companies = companyData;
    });
  }
  delete(data: Company) {
    if (confirm('Are you sure to delete')){
     this.tenderService.deleteCompany(data).subscribe((res) => {
       this.getAllCompanies();
     });
    }
 }

 editTender(tender){

 }

}
