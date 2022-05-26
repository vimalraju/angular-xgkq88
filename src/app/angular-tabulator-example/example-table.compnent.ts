import { Component, OnInit} from '@angular/core';
import Tabulator from 'tabulator-tables';


@Component({
  selector: 'app-example-table',
  templateUrl: './example-table.component.html',
  styleUrls: ['./example-table.component.scss']
})
export class ExampleTableComponent implements OnInit {

  exTable: Tabulator;
  filterParam: string = "";

  table_def = [
      { title: "Id", field: "id" },
      { title: "First Name", field: "firstName" },
      { title: "Last Name", field: "lastName" },
      { title: "Location", field: "state" }
    ];

  tabledata = [
    { id: '1', firstName: "John", lastName: "Smith", state: "Ohio" },
    { id: '2', firstName: "Jane", lastName: "Doe", state: "Iowa" },
    { id: '3', firstName: "Bill", lastName: "Great", state: "Hawaii" },
    { id: '4', firstName: "Ted", lastName: "Adventure", state: "Arizona" }
  ];
  
  constructor() { }

  ngOnInit() {

    this.exTable = new Tabulator("#ex-table-div",{
      height : 120,
      data: this.tabledata,
      layout: "fitColumns",
      columns: this.table_def,
      movableColumns: true,
    });
  }

  customFilter(data: any, filterParams: any){
    let flag = false;
  
    if(filterParams.filterText != ""){
      filterParams.tableDef.forEach((element)=>
        {
          let field = element.field;
          if(data[field].toLowerCase().includes(filterParams.filterText.toLowerCase())){
            flag = true;
          }
        }
      );
      return flag;
    }else{
      return true;
    }
  }

  updateFilter(value){
    this.filterParam = value;
    this.exTable.setFilter(this.customFilter, {filterText: this.filterParam, tableDef: this.table_def});
  }
}
