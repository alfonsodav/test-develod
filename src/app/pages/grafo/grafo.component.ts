import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-grafo',
  templateUrl: './grafo.component.html',
  styleUrls: ['./grafo.component.scss']
})
export class GrafoComponent implements OnInit {
  
  constructor(private person: PersonService) { }
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {text:'Generos'},
    series: this.person.grupos.map(data => {
      return {
        name: data.gender,
        data: [data.counter],
        type: 'pie'
      }
    })
  };
  ngOnInit(): void {
    //this.list();
  }
  /* list() {
    this.person.personList().subscribe(data => {
      console.log(data);
      this.data = data;
      this.grupos = this.data.reduce((acc=[], value) => {
        acc.forEach(per => per.gender === value.gender ? per.counter.push(1) : acc.push({gender: value.gender, counter: [1]})); 
        console.log(acc);
        return acc;
      },[{gender: '', counter: [0]}])
    });
    this.Highcharts.setOptions({
      title: {text:'Generos'},
      series: this.grupos.map(data => {
        return {
          name: data.gender,
          data: [data.counter],
          type: 'pie'
        }
      })
    });
  }
   */
  
  

}
