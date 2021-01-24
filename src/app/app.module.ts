import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { CurrencyPageComponent } from './pages/currency-page/currency-page.component';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { CurrencyEditDialogComponent } from './components/currency-edit-dialog/currency-edit-dialog.component';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptor } from './interceptor/error-interceptor';
import { PortfolioShowComponent } from './components/portfolio-show/portfolio-show.component';
import { PortfolioLinesListComponent } from './components/portfolio-lines-list/portfolio-lines-list.component';
import { PortfolioEditDialogComponent } from './components/portfolio-edit-dialog/portfolio-edit-dialog.component';
import { LineEditDialogComponent } from './components/line-edit-dialog/line-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CurrencyListComponent,
    CurrencyPageComponent,
    PortfolioPageComponent,
    CurrencyEditDialogComponent,
    PortfolioShowComponent,
    PortfolioLinesListComponent,
    PortfolioEditDialogComponent,
    LineEditDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
