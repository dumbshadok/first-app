import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent, NgFor, SearchComponent],
  template: `
  <section>
    <form action="">
      <input name="searchbar" type="text" placeholder="Filter by city" #filter (keydown.enter)="$event.preventDefault(); filterResult(filter.value)">
      <button class="primary" type="button" (click)="filterResult(filter.value)" (disabled)="filter.value == ''">Search <i></i></button>
      <img class="icon" src="/assets/funnel.svg" (click)="expanded=!expanded">

    </form>
  </section>
  <section *ngIf="expanded">
    <app-search></app-search>
  </section>

  <section class="results">
    <h2  *ngIf="filteredHousingLocationList.length==0; else results" >No home corresponding</h2>
    <ng-template #results>
      <app-housing-location
    *ngFor="let housingLocation of filteredHousingLocationList"
    [housingLocationInput]="housingLocation">
    </app-housing-location>
    </ng-template>
  </section>
  `,
  styleUrls: [`./home.component.css`],
})
export class HomeComponent {

  expanded = false
  housingLocationList: HousingLocation[] = []
  filteredHousingLocationList: HousingLocation[] = this.housingLocationList
  housingService: HousingService = inject(HousingService)
  cities: Set<string> | undefined



  filterResult(text: string) {
    console.log(text)
    if (text === "") {
      this.filteredHousingLocationList = this.housingLocationList
    }
    else {

      const homeAttributes = ['id', 'name', 'city', 'state', 'photo', 'availableUnits', 'wifi', 'laundry']
      
      this.filteredHousingLocationList = this.housingLocationList.filter(location =>      
        Object.values(location).at(homeAttributes.indexOf("name")).toString().toLowerCase().includes(text.toLowerCase())
    )
    
    }
    console.log(this.filteredHousingLocationList)
  }

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filterResult("")
      this.cities = new Set(this.filteredHousingLocationList.map(location => location.city).sort())
    })
  }

}

