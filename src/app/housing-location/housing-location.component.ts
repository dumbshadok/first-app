import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-location',
  imports: [CommonModule],
  template: `
  <section class="listing">
    <img
    class="listing-photo"
    [src]="housingLocationInput.photo"
    alt="exterior photo of {{housingLocationInput.name}}"
    crossorigin
    />
    <h2 class="listing-heading">{{ housingLocationInput.name }}</h2>
    <p class="listing-location">{{ housingLocationInput.city }}, {{ housingLocationInput.state }}</p>
  </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {

  @Input() housingLocationInput!: HousingLocation

}
