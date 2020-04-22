import { Component, OnInit ,  ViewChild } from '@angular/core';
import { AccountListService } from './Service/account-list.service';



declare var require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-tableaccount',
  templateUrl: './tableaccount.component.html',
  styleUrls: ['./tableaccount.component.css']
})
export class TableaccountComponent implements OnInit {

  editing = {};
    rows = [];
    temp = [...data];
    loadingIndicator = true;
    reorderable = true;
    columns = [
        { prop: 'FirstName' },
        { prop: 'AccountType' },
        { prop: 'Email' },
        { prop : 'Created at'},
        { prop : 'Action'}
    ];
    @ViewChild(TableaccountComponent) table: TableaccountComponent;
    constructor(private accounts: AccountListService) {
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
    }
    updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
    }
    updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  ngOnInit() {
    this.accounts.getCustomerId()
      .subscribe(
        result => {
          this.accounts.getAccountsList(result['Customer_id'])
            .subscribe(res => {
              this.rows = res['result']['Accounts'] ;
              this.temp = [...res['result']['Accounts']];
              console.log(res['result']);

            });
        });
  }
}
