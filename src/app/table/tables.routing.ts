import { Routes } from '@angular/router';

import { DatatableComponent } from './data-table/data-table.component';
import { BasicComponent } from './basic/basic.component';
import { SmarttableComponent } from './smart-table/smart-table.component';
import {TableaccountComponent} from './tableaccount/tableaccount.component'

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'BillList',
      component: DatatableComponent,
      data: {
        title: 'Bill List',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Bill List'}]
      }
    },
    {
      path: 'basictable',
      component: BasicComponent,
      data: {
        title: 'Basic Table',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Basic Table'}]
      }
    },
    {
      path: 'smarttable',
      component: SmarttableComponent,
      data: {
        title: 'Smart Table',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Smart Table'}]
      }
    },
    {
      path: 'tableaccount',
      component: TableaccountComponent,
      data: {
        title: 'Account Management',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Account Management'}]
      }
    }
  ]
  }
];
