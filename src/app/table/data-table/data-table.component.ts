import { Component, ViewChild, OnInit } from '@angular/core';
import { BillService } from './Service/bill.service'

declare var require: any;
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}
const data: any = require('./company.json');

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
   styleUrls: ['./data-table.css']
})
export class DatatableComponent implements OnInit{
    data= [] ;
    rows = [];
    temp = [...data];
    loadingIndicator: boolean = true;
    columns = [
        { prop: 'From' },
        { prop: 'To' },
        { prop: 'Amount(TND)'},
        { prop: 'PaymentDate'}
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(private BillService: BillService) {
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
    }
    open(row) {
      this.BillService.getCustomerId()
        .subscribe(
          res1 => {
            this.BillService.getMonitorId(res1['Customer_id'])
              .subscribe(
                result => {
                  this.BillService.DeleteBill(result['Monitor_id'], row['Bill_id']).subscribe(res => {
                    console.log(res);
                  });
                });
          });
    }

  ngOnInit() {
    this.BillService.getCustomerId()
      .subscribe(
        res1 => {
          console.log('this.BillService.getMonitorId', res1['Customer_id']);
          this.BillService.getMonitorId(res1['Customer_id'])
            .subscribe(
              result => {

                this.BillService.getBills(result['Monitor_id'])
                  .subscribe(res => {
                    var i  = 0 ;
                    while(i< res['result'][0]['Bills'].length) {
                      if (res['result'][0]['Bills'][i]['Status'] == "True") {
                        console.log(i);
                        this.data.push(res['result'][0]['Bills'][i]);
                      }
                      i++;
                    }
                    this.rows = this.data ;
                    this.temp = [...this.data];
                    console.log(this.rows);
                    console.log(res['result'][0]['Bills'][0]['PaymentStatus'],
                      typeof (res['result'][0]['Bills']['PaymentStatus']));

                    setTimeout(function () {
                    }, 10000); });
              });
        });
  }
}
