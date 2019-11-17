import { Component, OnInit } from '@angular/core';
import { RdfDataService } from '../services/rdf-data.service'

@Component({
  selector: 'app-cqpattern1',
  templateUrl: './cqpattern1.component.html',
  styleUrls: ['./cqpattern1.component.css']
})

export class CQPattern1Component implements OnInit {
  CE1:Array<Object> = [];  
  CE2:Array<Object> = [];
  ObjectProperties:Array<Object> = [];
  DD1_sel:string;
  DD1_sel_Info:string;
  DD2_sel:string;
  DD2_sel_Info:string;
  DD3_sel:string;
  DD3_sel_Info:string;
  restriction_bool:boolean;
  tableRows = [];
  custom_prefix:string = '';
  existing_cq_instances:Array<any> = [];
  add_as_class1:string='';
  add_as_class2:string='';
  add_as_op:string='';
  
 

  constructor(private dataService: RdfDataService) {
   }

  ngOnInit() {
    this.dataService.getNamespaces()
  }

  populateDD1(){
    if (this.restriction_bool == true && this.DD2_sel!=""){      
    this.dataService.getCE1WithRDFSRestriction(this.DD2_sel).subscribe((data:any) => {this.CE1 = data;});
    }
    else{
    this.dataService.getCE1WithoutRestriction().subscribe((data:any) => {this.CE1 = data});  
}}
 
  getInfo_DD1_sel(){
    this.DD1_sel_Info=""
    this.dataService.getInfo_DD1_sel(this.DD1_sel).subscribe((data:any) => {this.DD1_sel_Info = data;}) 
  }
  populateDD2(){
    if (this.restriction_bool == true && this.DD1_sel!=""){
    (this.dataService.getObjectPropertiesWithRDFSRestriction(this.DD1_sel).subscribe((data: any) => {this.ObjectProperties = data;})) 
    }
    else {
      this.dataService.getObjectPropertiesWithoutRestriction().subscribe((data: any) => {this.ObjectProperties = data;})
      }
  }
  getInfo_DD2_sel(){
    this.DD2_sel_Info=""
    this.dataService.getInfo_DD2_sel(this.DD2_sel).subscribe((data:any) => {this.DD2_sel_Info = data;})
  }
  populateDD3(){ 
    if (this.restriction_bool == true && this.DD2_sel!=""){ 
    this.dataService.getCE2WithRDFSRestriction(this.DD2_sel).subscribe((data: any) => {this.CE2 = data;})
    }
    else {
      this.dataService.getCE2WithoutRestriction().subscribe((data: any) => {this.CE2 = data;})
  }
  }
  getInfo_DD3_sel(){
    this.DD3_sel_Info=""
    this.dataService.getInfo_DD3_sel(this.DD3_sel).subscribe((data:any) => {this.DD3_sel_Info = data;})
  }
  clear(){
    this.DD1_sel="",
    this.DD2_sel="",
    this.DD3_sel="",
    this.DD1_sel_Info="",
    this.DD2_sel_Info="",
    this.DD3_sel_Info=""
  }
  CustomPrefix1(value:string){
    this.DD1_sel = value
    this.custom_prefix = value  
  }
  CustomPrefix2(value:string){
  this.DD2_sel = value
  this.custom_prefix = value
  }
  CustomPrefix3(value:string){
  this.DD3_sel = value
  this.custom_prefix = value
  }
  onEnterCustomConcept1(value:string){
  this.DD1_sel = this.DD1_sel.concat(':' + value)
  this.dataService.addCustomPrefix(this.custom_prefix)
  this.DD1_sel_Info=""
  this.add_as_class1 = this.DD1_sel.concat(" rdf:type owl:Class .")
  }
  onEnterCustomConcept2(value:string){
  this.DD2_sel = this.DD2_sel.concat(':' + value)  
  this.dataService.addCustomPrefix(this.custom_prefix)
  this.DD2_sel_Info=""
  this.add_as_op = this.DD2_sel.concat(" rdf:type owl:ObjectProperty .")
  }
  onEnterCustomConcept3(value:string){
    this.DD3_sel = this.DD3_sel.concat(':' + value)
    this.dataService.addCustomPrefix(this.custom_prefix)
    this.DD3_sel_Info=""
    this.add_as_class2 = this.DD3_sel.concat(" rdf:type owl:Class .")
  }

  onSubmit() {     
this.dataService.getCQCounter(1).subscribe((data:any) => {this.existing_cq_instances = data;});
setTimeout(() => {
  this.tableRows.push({
  DD1: this.DD1_sel,
  DD2: this.DD2_sel,
  DD3: this.DD3_sel})
  this.dataService.insert_data_CQ1(this.DD1_sel,this.DD2_sel,this.DD3_sel, (this.existing_cq_instances.length) + 1, this.add_as_class1, this.add_as_class2, this.add_as_op).subscribe(data => {data});

  this.DD1_sel="", 
  this.DD2_sel="",
  this.DD3_sel="",
  this.DD1_sel_Info="",
  this.DD2_sel_Info="",
  this.DD3_sel_Info=""
}, 2000); 
  }

  config = {
     search:true, //true/false for the search functionlity defaults to false,
     placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
     noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
     searchPlaceholder:'Search', // label thats displayed in search input,
     }
         
}


