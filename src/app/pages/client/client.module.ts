import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { CpfFormatDirective } from 'src/app/util/cpf-format.directive';
import { ClientAlterComponent } from './client-alter/client-alter.component';
import { AppDateFormatDirective } from 'src/app/util/app-date-format.directive';



@NgModule({
  declarations: [
    ClientListComponent,
    CpfPipe,
    ClientRegisterComponent,
    CpfFormatDirective,
    ClientAlterComponent,
    AppDateFormatDirective
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class ClientModule { }
