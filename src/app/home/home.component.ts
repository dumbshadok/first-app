import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgFor } from '@angular/common';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent, NgFor],
  template: `
  <section>
    <form action="">
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResult(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location
    *ngFor="let housingLocation of filteredHousingLocationList"
    [housingLocationInput]="housingLocation">
  
  </app-housing-location>
  </section>
  `,
  styleUrls: [`./home.component.css`],
})
export class HomeComponent {

  housingLocationList: HousingLocation[] = []
  filteredHousingLocationList: HousingLocation[] = this.housingLocationList
  housingService: HousingService = inject(HousingService)


  filterResult(text: string) {
    console.log(text)
    if(text==="") {
      this.filteredHousingLocationList = this.housingLocationList
    }
    else {
      this.filteredHousingLocationList = this.housingLocationList.filter(location => location.city.toLowerCase().includes(text.toLowerCase()))
    }
  }

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filterResult("")
    })
  }
  
}

