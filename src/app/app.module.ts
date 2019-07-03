import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {FormsModule} from '@angular/forms'


import { AppComponent } from "./app.component";
import { ProductListComponent } from "./Product/product-list.component";
import { ConvertToSpacesPipe } from "./shared/convert-to-spaces.pipe";
import { StarComponent } from "./shared/star.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule(
  {
    imports:[BrowserModule,FormsModule, HttpClientModule],
    declarations:[AppComponent,ProductListComponent,ConvertToSpacesPipe,StarComponent],
    bootstrap:[AppComponent]
  }
)
export class AppModule{

}