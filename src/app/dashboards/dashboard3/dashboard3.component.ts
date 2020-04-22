import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxDataService} from './Services/influx-data.service';
import { AccountslistService } from '../../accounts/Services/accountslist.service';
declare var require: any;


export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}
declare interface TableData {
  headerRow: string[];
  dataRows: any;
}


@Component({
	templateUrl: './dashboard3.component.html',
    styleUrls: ['./dashboard3.component.css']
})
export class Dashboard3Component implements AfterViewInit, OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  Object: any ;
  x = [];
  y = [];
  Monthly = [];
  AppliancesList = [] ;
  AppliancesConsumption = [] ;
  Appliances = [] ;
  AppliancesStatus = [] ;
	subtitle: string;
    source: LocalDataSource;
  private data: any;
  todat : any ;
  private options: any;
  private responsiveOptions: any;
  private type: any;
	constructor(private influx: InfluxDataService, private chatAlertsService: AccountslistService) {
		this.subtitle = 'This is some text within a card block.';
        this.source = new LocalDataSource(tableData.data);
	}
  // Radar
  public radarChartLabels: string[] = this.AppliancesList;
  public radarChartData: any = [
    // { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: this.AppliancesConsumption  }
  ];
  public radarChartType = 'pie';
  public radarChartColors: Array<any> = [
    {backgroundColor: 'rgba(0,158,251,0.5)', borderColor: 'rgba(0,158,251,1)'},
    // {backgroundColor: 'rgba(85,206,99,0.5)', borderColor: 'rgba(85,206,99,1)'}
  ];
  Legend: boolean ;
  chartType: any;

	ngAfterViewInit() {
        let sparklineLogin = function() {
            (<any>$('#sparklinedash')).sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
                type: 'bar',
                height: '50',
                barWidth: '2',
                resize: true,
                barSpacing: '5',
                barColor: '#26c6da'
            });
            (<any>$('#sparklinedash2')).sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
                type: 'bar',
                height: '50',
                barWidth: '2',
                resize: true,
                barSpacing: '5',
                barColor: '#7460ee'
            });
            (<any>$('#sparklinedash3')).sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
                type: 'bar',
                height: '50',
                barWidth: '2',
                resize: true,
                barSpacing: '5',
                barColor: '#03a9f3'
            });
            (<any>$('#sparklinedash4')).sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
                type: 'bar',
                height: '50',
                barWidth: '2',
                resize: true,
                barSpacing: '5',
                barColor: '#f62d51'
            });
        };
        let sparkResize;

        $(window).resize(function(e) {
            clearTimeout(sparkResize);
            sparkResize = setTimeout(sparklineLogin, 500);
        });
        sparklineLogin();
    }

  ngOnInit() {
    this.influx.getDBNAME()
      .subscribe(
        result => {
          this.influx.getMonthly(result['Name'])
            .subscribe(res1 => {
              this.Object = res1;
              for (let i = 0; i < this.Object.length; i++) {
                if (this.Object[i]['series'] < 0) {
                  this.x.push(this.Object[i]['series'] * -1);
                }
                else {
                  this.x.push(this.Object[i]['series']);

                }
                this.y.push(new Date(this.Object[i]['labels']).toDateString());
                this.type = 'Bar';

                this.data = {
                  labels: this.y,
                  series: [
                    {
                      data: this.x
                    }
                  ]
                };

                this.options = {
                  scales: {
                    xAxes: [{
                      time: {unit: 'day'},

                      ticks:{source: 'data'},
                      type: 'time',
                      displayFormats: {
                        // month: 'h'
                      },
                      distribution: 'series'
                    }],
                    yAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: 'kWh'
                      },
                      display: true
                    }],
                  }
                };

                this.responsiveOptions = [
                  ['screen and (min-width: 300px) and (max-width: 400px)', {
                    showPoint: false,
                    axisX: {
                      labelInterpolationFnc: function(value) {
                        return 'Week ' + value;
                      }
                    }
                  }],
                  ['screen and (max-width: 400px)', {
                    showLine: false,
                    xAxes: [{
                      time: {unit: 'day'},

                      ticks:{source: 'data'},
                      type: 'time',
                      displayFormats: {
                        // month: 'h'
                      },
                      distribution: 'series'
                    }],
                  }]
                ];
                // xdata.push(new Date(this.dataHourly[i].x).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
                // ydata.push(this.dataMonthly[i].y);
                // console.log(xdata);
              }

            });
        });
    // console.log(this.consumptionGaugemax);
    this.chatAlertsService.getCustomerId()
      .subscribe(
        res1 => {
          this.chatAlertsService.getMonitorId(res1['Customer_id'])
            .subscribe(
              result => {
                this.influx.getApplianceStatus(result['Monitor_id'])
                  .subscribe(
                    res => {
                      this.tableData2 = {
                        headerRow: ['#', 'Appliance', 'Status', 'Consumption'],
                        dataRows: res['result'][0]
                      };
                      this.AppliancesStatus.push(res['result'][0]);
                    }
                  );
              });
        });
    this.influx.getCustomerId()
      .subscribe(
        res1 => {
          this.chatAlertsService.getMonitorId(res1['Customer_id'])
            .subscribe(
              result => {
                this.chatAlertsService.getAlerts(result['Monitor_id'])
                  .subscribe(
                    res => {
                      this.tableData1 = {
                        headerRow: ['#', 'Alert Text', 'Type', 'Received at'],
                        dataRows: res['result']
                      };

                    }
                  );
              });
        });
    this.influx.getCustomerId().subscribe( res => {
      this.influx.getMonitorId(res['Customer_id']).subscribe( resultat => {
        this.influx.getAppliances(resultat['Monitor_id']).subscribe( res1 => {
          for (let i = 0; i < res1['result'][0].length; i++) {
            this.AppliancesList.push(res1['result'][0][i]['appliance_type']);
            this.AppliancesConsumption.push(res1['result'][0][i]['consumption']);
            this.Appliances.push(res1['result'][0][i]);
          }
          this.chartType = 'polarArea';
          this.Legend = true;
        });
      });

    });
  }
}
