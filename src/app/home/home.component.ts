import { Component } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent],
  template: `
  <section>
    <form action="">
      <input type="text" placeholder="Filter by city">
      <button class="primary" type="button">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location [housingLocationInput]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrls: [`./home.component.css`],
})
export class HomeComponent {

  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  housingLocation: HousingLocation = {
    id: 9999,
    name: 'Test Home',
    city: 'Test City',
    state: 'ST',
    photo: `${this.baseUrl}/example-house.jpg`,
    availableUnits: 99,
    wifi: true,
    laudry: false,
  };

}
