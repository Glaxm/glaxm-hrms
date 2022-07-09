import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CompanyComponent, AddCompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class CompanyModule { }
