import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-location',
  imports: [],
  template: `
    <p>
      housing-location works!
    </p>
  `,
  styles: ``
})
export class HousingLocationComponent {

@Input() housingLocationInput!: HousingLocation

}
