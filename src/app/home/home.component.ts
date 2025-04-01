import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      <input name="searchbar" type="text" placeholder="Filter by city" #filter (keydown.enter)="$event.preventDefault(); filterResult(filter.value)">
      <button class="primary" type="button" (click)="filterResult(filter.value)" (disabled)="filter.value == ''">Search <i></i></button>
    </form>
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

  housingLocationList: HousingLocation[] = []
  filteredHousingLocationList: HousingLocation[] = this.housingLocationList
  housingService: HousingService = inject(HousingService)

  filterResult(text: string) {
    console.log(text)
    if (text === "") {
      this.filteredHousingLocationList = this.housingLocationList
    }
    else {
      this.filteredHousingLocationList = this.housingLocationList.filter(location =>
    
        Object.values(location).slice(1, 4).toString().toLowerCase().includes(text.toLowerCase())
    )
    
    }
    console.log(this.filteredHousingLocationList)
  }

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filterResult("")
    })
  }

}

