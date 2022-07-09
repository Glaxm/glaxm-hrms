import { Component, OnInit, Input } from '@angular/core';
import { Datatable1Component } from '../datatable1/datatable1.component';

@Component({
  selector: 'column1',
  template: ``,
  styleUrls: ['./column1.component.css']
})
export class Column1Component  {
	@Input() value;
	@Input() header;
	@Input() sortVal;
	@Input() type;
	@Input() searchVar;
	@Input() width1;
	@Input() buttonName;
  constructor(table: Datatable1Component) {
		
    table.addColumn(this)
    
}

}
