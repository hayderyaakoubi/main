import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetsComponent } from './widgets.component';
import { WidgetDetailsComponent } from './widget-details/widget-details.component';
import { WidgetCreateComponent } from './widget-create/widget-create.component';
import { WidgetUpdateComponent } from './widget-update/widget-update.component';


const routes: Routes = [{
	path: '',
	data: {
        title: 'Widgets Page',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Widgets Page'}]
    },
	component: WidgetsComponent
},
{
	path: ':_id',
	data: {
        title: 'Widgets Details',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Widgets Page'}]
    },
	component: WidgetDetailsComponent
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule, 
        NgbModule,
    	RouterModule.forChild(routes)
    ],
	declarations: [WidgetsComponent, WidgetCreateComponent, WidgetUpdateComponent]
})
export class WidgetsModule { }