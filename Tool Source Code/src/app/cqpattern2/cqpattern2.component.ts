import { Component, OnInit } from '@angular/core';
import { RdfDataService } from '../services/rdf-data.service';


@Component({
  selector: 'app-cqpattern2',
  templateUrl: './cqpattern2.component.html',
  styleUrls: ['./cqpattern2.component.css']
})
export class CQPattern2Component implements OnInit {
  CE1:Array<Object> = [];  
  DD1_sel:string;
  DD1_sel_Info:string;
  tableRows = [];
  custom_prefix:string = '';
  existing_cq_instances:Array<any> = []
  add_as_class:string =''
  
  constructor(private dataService: RdfDataService) { }

  ngOnInit() {
    this.dataService.getNamespaces()
  }
  populateDD1(){  
    this.dataService.getCE1WithoutRestriction().subscribe((data:any) => {this.CE1 = data})  
  }
  getInfo_DD1_sel(){
    this.DD1_sel_Info=""
    this.dataService.getInfo_DD1_sel(this.DD1_sel).subscribe((data:any) => {this.DD1_sel_Info = data;}) 
  }
  clear(){
    this.DD1_sel="",
    this.DD1_sel_Info=""   
  }
  CustomPrefix1(value:string){
    this.DD1_sel = value
    this.custom_prefix = value  
  }
  onEnterCustomConcept1(value:string){
  this.DD1_sel = this.DD1_sel.concat(':' + value)
  this.dataService.addCustomPrefix(this.custom_prefix)
  this.DD1_sel_Info=""
  this.add_as_class = this.DD1_sel.concat(" rdf:type owl:Class .")
  }
  onSubmit() { 
    this.dataService.getCQCounter(2).subscribe((data:any) => {this.existing_cq_instances = data;});
setTimeout(() => {
  this.tableRows.push({
  DD1: this.DD1_sel
  })
  this.dataService.insert_data_CQ2(this.DD1_sel,(this.existing_cq_instances.length) + 1, this.add_as_class).subscribe(data => {data});

  this.DD1_sel="", 
  this.DD1_sel_Info=""
  
}, 2000); 
  }

  config = {
     search:true, //true/false for the search functionlity defaults to false,
     placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
     noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
     searchPlaceholder:'Search', // label thats displayed in search input,
     }      
}
