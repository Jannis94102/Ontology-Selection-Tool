import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Axios, { AxiosRequestConfig } from 'axios';



@Injectable({
    providedIn: 'root'
})

export class RdfDataService {

    host: string = 'http://localhost:7200';
    repository: string = '';
    query_string: string = ''
    PREFIXES: Array<Prefix> = []

iri1:string
iri2:string
iri3:string
custom_concept_graph = `<http://localhost:7200/repositories/${this.repository}/rdf-graphs/custom_concepts>`

    constructor(
        private http: HttpClient,
    ) { }

    addCustomPrefix(custom_prefix: string) {
        if (custom_prefix !== '' && this.query_string.includes("PREFIX " + custom_prefix + ":") == false) {
            this.query_string = this.query_string.concat(`PREFIX ${custom_prefix}: <http://custom-prefix/${custom_prefix}>`)
        this.PREFIXES.push({prefix: `${custom_prefix}:`, namespace:`http://custom-prefix/${custom_prefix}#`})
        }
    }
    // methods that fill in variables in a select query and return an observable of the db query
    getCE1WithoutRestriction() {
        var selectString = this.query_string +
            `SELECT DISTINCT ?s WHERE {
	    ?s rdf:type owl:Class .
        }` ;
        return this.selectList(selectString, 0);
    }
    getCE1WithRDFSRestriction(DD2_sel: string) {
        var selectString = this.query_string + `
        SELECT DISTINCT ?s WHERE {
            ${DD2_sel} rdfs:domain ?s .
            ?s rdf:type owl:Class  .
        }` ;
        return this.selectList(selectString, 0);
    }

    getInfo_DD1_sel(DD1_sel: string) {
        var selectString = this.query_string + `
        SELECT DISTINCT ?comment WHERE {
        ${DD1_sel} rdfs:comment ?comment .
        }` ;
        return this.selectList(selectString, 0);
    }

    getObjectPropertiesWithRDFSRestriction(DD1_sel: string) {
        var selectString = this.query_string + `
        SELECT DISTINCT ?op WHERE {
            ?in  ${DD1_sel} .
            ?op rdf:typProperty      }` ;
        return this.selectList(selectString, 0);
    }
    getDataPropertiesWithRDFSRestriction(DD1_sel: string) {
        var selectString = this.query_string + `
        SELECT DISTINCT ?op WHERE {
            ?op rdfs:domain  ${DD1_sel} .
            ?op rdf:type owl:DatatypeProperty  .
        }` ;
        return this.selectList(selectString, 0);
    }

    getObjectPropertiesWithoutRestriction() {
        var selectString = this.query_string + `
        SELECT DISTINCT ?op WHERE {
            ?op rdf:type owl:ObjectProperty  .
        }` ;
        return this.selectList(selectString, 0);
    }
    getDataPropertiesWithoutRestriction() {
        var selectString = this.query_string + `
        SELECT DISTINCT ?op WHERE {
            ?op rdf:type owl:DatatypeProperty  .
        }` ;
        return this.selectList(selectString, 0);
    }

    getInfo_DD2_sel(DD2_sel: string) {
        var selectString = this.query_string + `
        SELECT DISTINCT ?comment WHERE {
        ${DD2_sel} rdfs:comment ?comment .
        } ` ;
        return this.selectList(selectString, 0);
    }

    getCE2WithoutRestriction() {
        var selectString = this.query_string + `
        SELECT DISTINCT ?o WHERE {
            ?o rdf:type owl:Class .
        }` ;
        return this.selectList(selectString, 0);
    }

    getCE2WithRDFSRestriction(DD2_sel: string) {
        var selectString = this.query_string + `
        SELECT DISTINCT ?s WHERE {
            ${DD2_sel} rdfs:range ?s .
            ?s rdf:type owl:Class  .
        } ` ;
        return this.selectList(selectString, 0);
    }

    getInfo_DD3_sel(DD3_sel: string) {
        var selectString = this.query_string + `
        SELECT DISTINCT ?comment WHERE {
        ${DD3_sel} rdfs:comment ?comment .
        }` ;
        return this.selectList(selectString, 0);
    }
    getCQCounter(pattern:number) {
        var selectString = this.query_string +
            `SELECT DISTINCT ?s WHERE {
	    ?s rdf:type cqstore:FormalCompetencyQuestion_Type${pattern} .
        }` ;
        return this.selectList(selectString, 0);
    }
    insert_data_CQ1(DD1_sel: string, DD2_sel: string, DD3_sel: string, counter:number,add_class1:string,add_op:string, add_class2:string) {
        // res enthält jeweils Prefix und Konzeptname als String; zum Prefix wird aus dem Prefix-Array der entsprechende Namespace herausgesucht
    var res1 = DD1_sel.split(":")
    this.iri1 = (this.PREFIXES.find(element => element.prefix.includes(res1[0]))).namespace
    var res2 = DD2_sel.split(":")
    this.iri2 = (this.PREFIXES.find(element => element.prefix.includes(res2[0]))).namespace
    var res3 = DD3_sel.split(":")
    this.iri3 = (this.PREFIXES.find(element => element.prefix.includes(res3[0]))).namespace
    this.custom_concept_graph = `<http://localhost:7200/repositories/${this.repository}/rdf-graphs/custom_concepts>`
        var selectString = this.query_string + `
        INSERT DATA
            {
            GRAPH <http://localhost:7200/repositories/${this.repository}/rdf-graphs/cq_store> {
                cqstore:cqt1_${counter} rdf:type cqstore:FormalCompetencyQuestion_Type1 .
                cqstore:cqt1_${counter} cqstore:hasCE1 cqstore:cq1_ce1_${counter}  .
                cqstore:cq1_ce1_${counter} rdf:type cqstore:CE .
                cqstore:cqt1_${counter} cqstore:hasOPE cqstore:cq1_ope_${counter} .
                cqstore:cq1_ope_${counter} rdf:type cqstore:OPE .
                cqstore:cqt1_${counter} cqstore:hasCE2 cqstore:cq1_ce2_${counter} .
                cqstore:cq1_ce2_${counter} rdf:type cqstore:CE .
                cqstore:cq1_ce1_${counter} cqstore:hasConceptName "${res1[1]}"^^xsd:string .
                cqstore:cq1_ce1_${counter} cqstore:hasIRI "${this.iri1}"^^xsd:string .
                cqstore:cq1_ope_${counter} cqstore:hasConceptName "${res2[1]}"^^xsd:string .
                cqstore:cq1_ope_${counter} cqstore:hasIRI "${this.iri2}"^^xsd:string .
                cqstore:cq1_ce2_${counter} cqstore:hasConceptName "${res3[1]}"^^xsd:string .
                cqstore:cq1_ce2_${counter} cqstore:hasIRI "${this.iri3}"^^xsd:string .
            }
            GRAPH ${this.custom_concept_graph} {
                ${add_class1}
                ${add_op}
                ${add_class2}
            }
        }` ;
console.log(selectString)
        return this.selectList2(selectString);
    }
    insert_data_CQ2(DD1_sel: string, counter:number, add_class:string) {
        var res1 = DD1_sel.split(":")
    this.iri1 = (this.PREFIXES.find(element => element.prefix.includes(res1[0]))).namespace
    this.custom_concept_graph = `<http://localhost:7200/repositories/${this.repository}/rdf-graphs/custom_concepts>`
        var selectString = this.query_string + `
        INSERT DATA
            {
GRAPH <http://localhost:7200/repositories/${this.repository}/rdf-graphs/cq_store> {
    cqstore:cqt2_${counter} rdf:type cqstore:FormalCompetencyQuestion_Type2 .
    cqstore:cqt2_${counter} cqstore:hasCE cqstore:cq2_ce_${counter}  .
    cqstore:cq2_ce_${counter} rdf:type cqstore:CE .
    cqstore:cq2_ce_${counter} cqstore:hasConceptName "${res1[1]}"^^xsd:string .
    cqstore:cq2_ce_${counter} cqstore:hasIRI "${this.iri1}"^^xsd:string .
}
            GRAPH ${this.custom_concept_graph} {
                ${add_class}
            }
        }` ;
        return this.selectList2(selectString);
    }
    insert_data_CQ3(DD1_sel: string, DD2_sel: string, counter:number,add_class:string,add_dp:string) {
        var res1 = DD1_sel.split(":")
        this.iri1 = (this.PREFIXES.find(element => element.prefix.includes(res1[0]))).namespace
        var res2 = DD2_sel.split(":")
        this.iri2 = (this.PREFIXES.find(element => element.prefix.includes(res2[0]))).namespace
        this.custom_concept_graph = `<http://localhost:7200/repositories/${this.repository}/rdf-graphs/custom_concepts>`
        var selectString = this.query_string + `
        INSERT DATA
            {
            GRAPH <http://localhost:7200/repositories/${this.repository}/rdf-graphs/cq_store> {
                cqstore:cqt3_${counter} rdf:type cqstore:FormalCompetencyQuestion_Type3 .
                cqstore:cqt3_${counter} cqstore:hasCE1 cqstore:cq3_ce_${counter}  .
                cqstore:cq3_ce_${counter} rdf:type cqstore:CE .
                cqstore:cqt3_${counter} cqstore:hasDPE cqstore:cq3_dpe_${counter} .
                cqstore:cq3_dpe_${counter} rdf:type cqstore:DPE .
                cqstore:cq3_ce_${counter} cqstore:hasConceptName "${res1[1]}"^^xsd:string .
                cqstore:cq3_ce_${counter} cqstore:hasIRI "${this.iri1}"^^xsd:string .
                cqstore:cq3_dpe_${counter} cqstore:hasConceptName "${res2[1]}"^^xsd:string .
                cqstore:cq3_ce_${counter} cqstore:hasIRI "${this.iri2}"^^xsd:string .
            }
            GRAPH ${this.custom_concept_graph} {
                ${add_class}
                ${add_dp}
            }
        }` ;
        return this.selectList2(selectString);
    }
    insert_data_CQ4(DD1_sel: string, DD2_sel: string, DD3_sel: string, counter:number,add_class1:string,add_op:string, add_class2:string) {
        var res1 = DD1_sel.split(":")
        this.iri1 = (this.PREFIXES.find(element => element.prefix.includes(res1[0]))).namespace
        var res2 = DD2_sel.split(":")
        this.iri2 = (this.PREFIXES.find(element => element.prefix.includes(res2[0]))).namespace
        var res3 = DD3_sel.split(":")
        this.iri3 = (this.PREFIXES.find(element => element.prefix.includes(res3[0]))).namespace
        this.custom_concept_graph = `<http://localhost:7200/repositories/${this.repository}/rdf-graphs/custom_concepts>`
        var selectString = this.query_string + `
        INSERT DATA
            {
            GRAPH <http://localhost:7200/repositories/${this.repository}/rdf-graphs/cq_store> {
                cqstore:cqt4_${counter} rdf:type cqstore:FormalCompetencyQuestion_Type4 .
                cqstore:cqt4_${counter} cqstore:hasCE1 cqstore:cq4_ce_${counter}  .
                cqstore:cq4_ce_${counter} rdf:type cqstore:CE .
                cqstore:cqt4_${counter} cqstore:hasOPE cqstore:cq4_ope_${counter} .
                cqstore:cq4_ope_${counter} rdf:type cqstore:OPE .
                cqstore:cqt4_${counter} cqstore:hasCE2 cqstore:cq4_ce2_${counter} .
                cqstore:cq4_ce2_${counter} rdf:type cqstore:CE .
                cqstore:cq4_ce_${counter} cqstore:hasConceptName "${res1[1]}"^^xsd:string .
                cqstore:cq4_ce_${counter} cqstore:hasIRI "${this.iri1}"^^xsd:string .
                cqstore:cq4_ope_${counter} cqstore:hasConceptName "${res2[1]}"^^xsd:string .
                cqstore:cq4_ope_${counter} cqstore:hasIRI "${this.iri2}"^^xsd:string .
                cqstore:cq4_ce2_${counter} cqstore:hasConceptName "${res3[1]}"^^xsd:string .
                cqstore:cq4_ce2_${counter} cqstore:hasIRI "${this.iri3}"^^xsd:string .
            }
            GRAPH ${this.custom_concept_graph} {
                ${add_class1}
                ${add_op}
                ${add_class2}
            }
        }` ;
        return this.selectList2(selectString);
    }

    private selectList(Query, varPosition) {
        var url = this.host + '/repositories/' + this.repository;
        var currentList: Array<String>;
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/sparql-query'
            })
        };

        var listObservable = new Observable((observer) => {
            this.http.post(url, Query, httpOptions).subscribe((data: any) => {
                this.parseToPrefix(data);
                currentList = this.buildList(data, varPosition)
                observer.next(currentList)
                observer.complete()

            })
        })
        return listObservable;
    }

    private selectList2(Query) {
        var url = this.host + '/repositories/' + this.repository + '/statements';
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/sparql-update'
            })
        };

        var listObservable = new Observable(() => {
            this.http.post(url, Query, httpOptions).subscribe(() => {

            })

        })

        return listObservable;
    }


    private buildList(SPARQLReturn, index) {
        var head = SPARQLReturn.head.vars[index];
        var data = SPARQLReturn.results.bindings
        var list: Array<string> = [];

        for (const i in data) {
            list[i] = data[i][head].value
        }
        return list;

    }

    private parseToPrefix(SPARQLReturn: any) {
        var PREFIXES = this.PREFIXES;
        var returnObject = SPARQLReturn;
        // loop iterates over all results
        for (const key in returnObject.results.bindings) {
            if (returnObject.results.bindings.hasOwnProperty(key)) {
                const element = returnObject.results.bindings[key];
                // console.log(element)
                // loop iterates over all values of a result
                for (const key2 in element) {
                    if (element.hasOwnProperty(key2)) {
                        const elementValue = element[key2];
                        // console.log(elementValue)
                        // for each value it is checked whether there is a prefix to be used or not
                        for (let ii = 0; ii < PREFIXES.length; ii++) {
                            // help variable to use string function
                            var str = elementValue.value
                            // if a binding is using a namespace known to the app, then it is replaced by the known prefix
                            if (str.search(PREFIXES[ii].namespace) != -1) {
                                elementValue.value = str.replace(PREFIXES[ii].namespace, PREFIXES[ii].prefix)
                                // console.log(elementValue.value);
                            }
                        }
                    }
                }
            }
        }
        return returnObject;
    }

clearDefaultGraph(){
    var repository_dummy:string = this.repository;
    var promise = new Promise(function (resolve) {

        var config: AxiosRequestConfig = {
          method: 'DELETE',
          baseURL: 'http://localhost:7200/',

          url: `/repositories/${repository_dummy}/rdf-graphs/service?default`
        }
        Axios(config).then(function (response) {
          if (response.status==204){
            alert("Löschen erfolgreich!")}
        })
        .catch(function (error) {
            alert(error)
          });
      });
      return promise
}

clearRepository(){
    var repository_dummy:string = this.repository;
    var promise = new Promise(function (resolve) {

        var config: AxiosRequestConfig = {
          method: 'DELETE',
          baseURL: 'http://localhost:7200/',

          url: `/repositories/${repository_dummy}/statements`
        }
        Axios(config).then(function (response) {
          if (response.status==204){
            alert("Löschen erfolgreich!")}
        })
        .catch(function (error) {
            alert(error)
          });
      });
      return promise
}
getRepositoryList(rep_list){
    // Liste mit allen Repositories aus GraphDB holen
    this.http.get("http://localhost:7200/repositories").subscribe((res) => {
      res["results"].bindings.forEach( (element) => {
      rep_list.push(element.id.value)
      });
      }) 
    } 
//Namespaces aus GraphDB holen, um die Konzeptnamen mit Präfixen darzustellen
getNamespaces(){
    this.PREFIXES = []     
    Axios.get(`http://localhost:7200/repositories/${this.repository}/namespaces`).then((response) => {   
       for (let i of response.data.results.bindings){      
         this.PREFIXES.push({prefix:i.prefix.value, namespace:i.namespace.value});
         }        
       })    
       setTimeout( () => {
        for (let i in this.PREFIXES) {
            this.PREFIXES[i].prefix = this.PREFIXES[i].prefix.concat(":")};         
        }, 500); 
        setTimeout( () => {
        this.setQueryString() }, 1000); 
    }
// Präfix-Namespace-Mapping in String-Variable schreiben, die für SPARQL-Queries notwendig ist
setQueryString(){ 
    this.query_string = ''  
    var arrayList1 = this.PREFIXES.map(element => element.prefix); 
    var arrayList2 = this.PREFIXES.map(element => element.namespace); 
    
    for (let i in this.PREFIXES) { 
    this.query_string = this.query_string.concat('PREFIX ' + arrayList1[i] + ' ')
    this.query_string = this.query_string.concat('<' + arrayList2[i] + '> ')
    }
}
createNewRepository(name:string){
    var promise = new Promise(function (resolve) {
        var config: AxiosRequestConfig = {
            method: 'POST',
            headers: {
            'Content-Type': "application/json",
            'Accept': '*/*'
            },
            responseType: 'text',
            data:   {
                "id": `${name}`,
                "location": "",
                "params": { },
                "sesameType": "graphdb:FreeSailRepository",
                "title": `${name}`,
                "type": "free"
              },
            baseURL: "http://localhost:7200/rest/repositories"
        }

        Axios(config).then(
            function (response) {
            // console.log("Erfolg beim Create: " + response.status);
alert("Repository wurde erfolgreich angelegt.")
            resolve(response);
            },
            function (e) {
                // console.log("Fehler beim Create: ", e.response.data.message);
                alert(e.response.data.message)
            }
        )

      });
}

    getTbox(TBOX_URL:string,custom_indicator:boolean,rep_name:string) {
        var default_URLs = {
            energyuse: { url: "https://raw.githubusercontent.com/evhart/ontologies/master/eu.owl",
            content_type: 'application/rdf+xml'},
            sewoa: { url: "https://raw.githubusercontent.com/afernbach/openKB4BMS/master/xsltstuff/src/main/resources/sewoa.owl",
            content_type: 'application/rdf+xml'},
            semanco: { url:"https://raw.githubusercontent.com/Jannis94102/Ontology-Selection-Tool/master/ontology files/semanco.owl",
            content_type: 'application/rdf+xml'},
            saref4ee: {url: "https://raw.githubusercontent.com/Jannis94102/Ontology-Selection-Tool/master/ontology files/saref4ee.ttl",
            content_type: 'text/turtle'},
            saref: {url: "https://raw.githubusercontent.com/Jannis94102/Ontology-Selection-Tool/master/ontology files/saref.ttl",
            content_type: 'text/turtle'},
            time:{url: "https://raw.githubusercontent.com/Jannis94102/Ontology-Selection-Tool/master/ontology files/w3c_time.ttl",
            content_type: 'text/turtle'},
            provo:{url: "https://raw.githubusercontent.com/Jannis94102/Ontology-Selection-Tool/master/ontology files/prov-o.ttl",
            content_type: 'text/turtle'},
            geosparql:{url: "https://raw.githubusercontent.com/Jannis94102/Ontology-Selection-Tool/master/ontology files/geosparql.owl",
            content_type: 'application/rdf+xml'},
            om2:{url: "https://raw.githubusercontent.com/Jannis94102/Ontology-Selection-Tool/master/ontology files/om-2.ttl",
            content_type: 'text/turtle'},
            custom:{url: TBOX_URL,
            content_type: 'application/rdf+xml'},
            cq_store:{url:"https://raw.githubusercontent.com/Jannis94102/Ontology-Selection-Tool/master/CQ-Storage%20Ontology/CQ-Store-Ontology.owl",
            content_type: 'application/rdf+xml'}
        };  

        var host_dummy:string = this.host;
        var repository_dummy:string = this.repository;
        var URL:string;
        var content_type:string;
        var url:string
        if(rep_name != '') {repository_dummy = rep_name}
        if(TBOX_URL == 'cq_store') { url = `/repositories/${repository_dummy}/rdf-graphs/cq_store`}
        if(TBOX_URL != 'cq_store') { url = `/repositories/${repository_dummy}/statements`}
        if (custom_indicator == true) {URL = TBOX_URL;
        content_type = default_URLs.custom.content_type}
        if (custom_indicator == false) {URL = default_URLs[`${TBOX_URL}`].url;
        content_type = default_URLs[`${TBOX_URL}`].content_type
        }

        var promise = new Promise(function() {
            Axios.get(URL).then(function (response) {

                    var config_post: AxiosRequestConfig = {
                        method: `POST`,
                        headers: {
                            'Content-Type': `${content_type}`,
                            'Accept': '*/*'
                        },
                        responseType: 'text',
                        data: response.data,
                        baseURL: host_dummy,
                        url: `${url}`
                    }

                    Axios(config_post).then(function (response) {
                        // console.log("Got a response from GraphDB ");
                        // console.log(response.status);
                        if (response.status==204){
                            alert("Import erfolgreich!")
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert(error)
                      });
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                  });
        })
       return promise
    }
}

class Prefix {
    prefix: string;
    namespace: string;
}






