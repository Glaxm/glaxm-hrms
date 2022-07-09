import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
//import { AddSectionSkillsComponent } from './add-section-skills/add-section-skills.component';


@NgModule({
  declarations: [SkillsComponent, AddSkillsComponent],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class SkillsModule { }
