import { CommonModule, NgFor } from '@angular/common';
import {  Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../search.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-search',
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @Output() searchOutput = new EventEmitter<HousingLocation[]>()

  searchService = inject(SearchService)

  cities = ["hello"]
  states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]

  filterForm = new FormGroup(
    {
      name: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      availableUnits: new FormControl(0),
      wifi: new FormControl(),
      withLaundry: new FormControl(true, {nonNullable: true}),
      withoutLaundry: new FormControl(true, {nonNullable: true})

    }
  )

  search() {
    console.log("searching")
    
    const wifiBoolOrNull = (): boolean | null => {
      if(this.filterForm.value.wifi === 'true') return true;
      if(this.filterForm.value.wifi === 'false') return false;
      else return null
    }
    const wifi = wifiBoolOrNull()
    
    const laundryBoolOrNull = () => {
      if(this.filterForm.value.withLaundry) {
        if(this.filterForm.value.withoutLaundry) return null;
        return true
      }
      if(this.filterForm.value.withoutLaundry) return false;
      return null
    }
    const laundry = laundryBoolOrNull()
    


    const searchResult: HousingLocation[] = this.searchService.search(
      this.filterForm.value.name ?? "",
      this.filterForm.value.city ?? "",
      this.filterForm.value.state ?? "",
      this.filterForm.value.availableUnits ?? 0,
      wifi,
      laundry)

      console.log(searchResult)
      this.searchOutput.emit(searchResult)

    }



}
