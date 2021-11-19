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
    title: { text: 'Generos' },
    series: [/* {
      name: 'f',
      data: [1,3],
      type: 'line'
    },
    {
      name: 'm',
      data: [4,5],
      type: 'line'
    } */]
  };
  ngOnInit(): void {
    this.chartOptions.series?.push({
      name: 'Personas de cada genero',
      data: this.person.grupos,
      type: 'pie'
    })
  };

}
