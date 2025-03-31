import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-location',
  imports: [CommonModule, RouterLink],
  template: `
  <section class="listing">
  <img src="/assets/loading.gif" crossorigin *ngIf="housingLocationInput == null; else card">
  <ng-template #card>
    <img
    class="listing-photo"
    [src]="housingLocationInput.photo"
    alt="exterior photo of {{housingLocationInput.name}}"
    crossorigin
    />
    <h2 class="listing-heading">{{ housingLocationInput.name }}</h2>
    <p class="listing-location">{{ housingLocationInput.city }}, {{ housingLocationInput.state }}</p>
    <a [routerLink]="['/details', housingLocationInput.id]">Learn More</a>
    </ng-template>

  </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {

  @Input() housingLocationInput!: HousingLocation

}
