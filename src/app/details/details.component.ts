import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;


  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')

  })

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id'])
    this.housingService.getHousingLocationById(housingLocationId)
      .then((housingLocation: HousingLocation | undefined) => this.housingLocation = housingLocation)
  }


  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
}
