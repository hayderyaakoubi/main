import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IconsRoutes } from './icons.routing';
import { fontawesomeComponent } from './fontawesome/fontawesome.component';
import { SimplelineComponent } from './simpleline/simpleline.component';
import { MaterialComponent } from './material/material.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(IconsRoutes),
    FormsModule
  ],
  declarations: [
    fontawesomeComponent,
    SimplelineComponent,
    MaterialComponent
  ]
})

export class IconsModule {}