import { Component, OnInit } from '@angular/core';
import { GraphicService } from 'src/app/services/graphic.service';
import { EChartOption } from 'echarts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {

  series: Array<any>;

  nombre: any;
  lastPrice: any;
  medida: any;
  fecha: any;

  chartOption = {};

  constructor(private service: GraphicService, private active: ActivatedRoute) {

    active.paramMap.subscribe(data => {
      let id = data.get('id');

      service.getDetails(id).subscribe(data => {
        console.log(data)
        let tmp = []
        data.serie = data.serie.reverse();
        let z = 0;
        data.serie.map(x => {
          if (z < 11) {
            const f = new Date(x.fecha)
            const month = f.getMonth() + 1;
            const m = month < 10 ? `0${month}` : month
            const fecha = `${f.getFullYear()}-${m}-${f.getDate()}`
            tmp.push([fecha, x.valor])
          }
          z++
        })
        this.lastPrice = data.serie[data.serie.length-1].valor;
        this.nombre = data.nombre;
        const d = new Date(data.serie[data.serie.length-1].fecha);
        this.fecha = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`

        this.setGraphic(tmp);
      })
    })

  }

  setGraphic(data) {

    const historyTheft = [
      ["2018-02-15", 1], ["2018-06-15", 7], ["2018-08-15", 3], ["2018-09-15", 4]
    ];
    this.chartOption = {
      title: {
        text: 'Precios'
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { type: ['line', 'bar'] },
          saveAsImage: {}
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      calculable: true,
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        },
        boundaryGap: true,
        axisLabel: {
          formatter: (function (value) {
            var date = new Date(value);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
          })
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'empty'
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'empty'
        },
      ],
      color: [
        "#3bc47d",
      ],
      series: [
        {
          name: 'Users',
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: data
        }
      ]
    }
  }

  ngOnInit(): void {
  }
}
