import { Component, OnInit } from '@angular/core';
import { InfluxDataService} from '../../dashboard3/Services/influx-data.service';
import { AccountslistService } from '../../../accounts/Services/accountslist.service';

@Component({
    selector: 'income-counter',
	templateUrl: './income-counter.component.html'
})
export class IncomeCounterComponent implements OnInit {
  interval: any;
  public realTimeValue: number;
  consumptionGaugeValue = 0;
  public unitPrice = 0.35;
  half;
  date: any;
  gaugeValue;
  public updated: any;
  public Goal: number;
  percent: number ;
	constructor(private  rule: AccountslistService, private influx: InfluxDataService) {
    this.date = new Date();
	}
  getConsumption() {
    this.influx.getDBNAME()
      .subscribe(
        result => {
          this.influx.getConsum(result['Name'])
            .subscribe(res => {
              this.gaugeValue = res['somme'];
              // this.gaugeValue = res['somme'].toFixed(2);
              this.consumptionGaugeValue = parseFloat((this.gaugeValue * this.unitPrice).toFixed(2));
              this.percent = parseFloat((this.consumptionGaugeValue / this.Goal).toFixed(2)) * 100 ;
              // this.consumptionGaugeValue = this.gaugeValue * this.unitPrice;
              // this.updated= res['date'];
              // console.log('somme', res['somme'].toFixed(2));
            });
        });
  }
  refreshData() {
    this.influx.getDBNAME()
      .subscribe(
        result => {
          // console.log(result);
          this.influx.getRealTime(result['Name'])
            .subscribe(res => {
              this.realTimeValue = res['value'].toFixed(2);
              // this.gaugeValue = res['value'].toFixed(2);
              this.updated = res['time'];
              // console.log(res['value'].toFixed(2));
            });
        });
    this.getConsumption();
  }

  ngOnInit() {
    this.rule.getCustomerId()
      .subscribe(
        result => {
          this.rule.getRule(result['Customer_id'], result['Account_id'])
            .subscribe(res => {
              // console.log('getRule', res);
              this.Goal = res['result'].Goal;

            });
        });
    // console.log(this.consumptionGaugemax);
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 10000);
  }

}
