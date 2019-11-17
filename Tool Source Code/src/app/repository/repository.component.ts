import { Component, OnInit } from '@angular/core';
import { RdfDataService } from '../services/rdf-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Axios from 'axios';


@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})

export class RepositoryComponent implements OnInit {
  
custom_indicator:boolean
//checkbox indicator for SG-ontologies
sewoa:boolean
semanco:boolean
prosgv3:boolean
bonsai:boolean
saref4ee:boolean
saref:boolean
energyuse:boolean
//checkbox indicator for generic ontologies
provo:boolean
time:boolean
geosparql:boolean
om2:boolean
//indicator to disable checkbox after once checked
sewoa_disabled : boolean;
semanco_disabled : boolean;
prosgv3_disabled : boolean;
saref4ee_disabled : boolean;
saref_disabled : boolean;
energyuse_disabled : boolean;
time_disabled:boolean
provo_disabled:boolean
geosparql_disabled:boolean
om2_disabled:boolean
rep_list:Array<string> = [];
active_rep:string;
RepName:string

fileData: File = null;

  constructor(private dataService: RdfDataService, private http: HttpClient ) { }

  ngOnInit() {
    this.custom_indicator=false      // wird nur auf true gesetzt, wenn eine Ontologie per URL importiert werden soll
    this.active_rep = this.dataService.repository    
    this.dataService.getRepositoryList(this.rep_list) 
  }

  // Coding zum Upload einer Datei und Übermittlung an GraphDB
  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //  console.log(this.fileData)
  // }
  // onSubmit() {       
  //   var httpOptions = {
  //     headers: new HttpHeaders({
  //         'Content-Type': 'text/turtle',
  //     })
  // };
  //   const formData = new FormData();
  //   formData.append('file', this.fileData);
  //   this.http.post('http://localhost:7200/repositories/testdb/statements',formData, httpOptions)
  //     .subscribe(res => {
  //       console.log(res);
  //       alert('SUCCESS !!');
  //     })
  // }

  createNewRepository(RepName){
    this.dataService.createNewRepository(RepName)
    this.rep_list = []
    this.dataService.getRepositoryList(this.rep_list) 
    var value = "cq_store"
    this.dataService.getTbox(value,false, RepName)
  }

    //ausgewähltes Repository im RDF Data Service bekannt machen
  onRepositoryChange(selectedRep){
    this.active_rep = selectedRep
    this.dataService.repository = selectedRep      
  }

  clearDefaultGraph(){
    this.dataService.clearDefaultGraph()
  }
  clearRepository(){
    this.dataService.clearRepository()
  }

  // Übermittlung einer Ontologie per URL
  onEnterOntologyImport(value:string){
    this.custom_indicator=true
this.dataService.getTbox(value,this.custom_indicator,'')
  }
 
  // Übermittlung spezifischer Ontologien an GraphDB per Checkbox
  value_changed(){
    this.custom_indicator=false
  if (this.sewoa==true){
    this.sewoa_disabled = true
    var value = "sewoa"     
    this.dataService.getTbox(value,this.custom_indicator,'')
    this.sewoa=false
  }
  if (this.semanco==true){
    this.semanco_disabled = true
    var value = "semanco"      
    this.dataService.getTbox(value,this.custom_indicator,'')
    this.semanco=false
  }
  if (this.prosgv3==true){
    this.prosgv3_disabled = true
    var value = "prosgv3"      
    this.dataService.getTbox(value,this.custom_indicator,'')
    this.prosgv3=false
  }
  if (this.saref4ee==true){
    this.saref4ee_disabled = true
    var value = "saref4ee"      
    this.dataService.getTbox(value,this.custom_indicator,'')
    this.saref4ee=false
  }
  if (this.saref==true){
    this.saref_disabled = true
    var value = "saref"      
    this.dataService.getTbox(value,this.custom_indicator,'')
    this.saref=false
  }
  if (this.energyuse==true){
    this.energyuse_disabled = true
    var value = "energyuse"      
    this.dataService.getTbox(value,this.custom_indicator,'')
    this.energyuse=false
  }
  if (this.time==true){
    this.time_disabled = true
    var value = "time"     
    this.dataService.getTbox(value,this.custom_indicator,'')
    this.time=false
  }
  if (this.provo==true){   
    this.provo_disabled = true
    var value = "provo"      
    this.dataService.getTbox(value,this.custom_indicator,'')
    this.provo=false
  }
  if (this.geosparql==true){    
    this.geosparql_disabled = true
    var value = "geosparql"      
    this.dataService.getTbox(value,this.custom_indicator,'')
    this.geosparql=false
  }
    if (this.om2==true){    
      this.om2_disabled = true
      var value = "om2"      
      this.dataService.getTbox(value,this.custom_indicator,'')
      this.om2=false
    }

}
importCQStorageOntology(){
  var value = "cq_store"
  this.dataService.getTbox(value,false,'')
}
}

class Prefix {
  prefix: string;
  namespace: string;
}
