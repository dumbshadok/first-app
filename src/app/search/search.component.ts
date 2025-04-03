import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {

  searchService = inject(SearchService)


  cities = ["hello"]
  states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]

  filterForm = new FormGroup(
    {
      name: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      availableUnits: new FormControl(),
      laundry: new FormControl(),
      wifi: new FormControl()

    }
  )

  search() {
    console.log("searching")
    this.searchService.search(
      this.filterForm.value.name ?? "",
      this.filterForm.value.city ?? "",
      this.filterForm.value.state ?? "",
      this.filterForm.value.availableUnits ?? 0,
      this.filterForm.value.laundry,
      this.filterForm.value.wifi

    )

  }




}
