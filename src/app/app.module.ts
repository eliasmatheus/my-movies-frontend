import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AddToWatchlistModalComponent } from './@shared/components/add-to-watchlist-modal/add-to-watchlist-modal.component';
import { ModalComponent } from './@shared/components/ui/modal/modal.component';
import { WatchlistModalComponent } from './@shared/components/watchlist-modal/watchlist-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalComponent,
    WatchlistModalComponent,
    AddToWatchlistModalComponent,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
