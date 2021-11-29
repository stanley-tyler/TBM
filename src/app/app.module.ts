import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BikeService } from './services/bike.service';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ViewRegistrationComponent } from './components/view-registration/view-registration.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from './services/auth.guard';
import {  AutocompleteFilterExample } from "./components/shared/autoComplete/autocomplete-filter-example";
import { TablePaginationExample } from "./components/shared/tablePagination/table-pagination-example";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { NgbdModalConfirm, NgbdModalConfirmAutofocus, NgbdModalFocus } from "./components/shared/modalAutoFocus/modal-focus";
import { NgbDate, NgbDropdown,NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    ViewRegistrationComponent,
    CallbackComponent,
    AutocompleteFilterExample,
    TablePaginationExample,
    NgbdModalFocus, 
    NgbdModalConfirm, 
    NgbdModalConfirmAutofocus
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgbModule,
  ],
  providers: [BikeService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
