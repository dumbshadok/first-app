import { inject, Injectable } from "@angular/core";
import { HousingLocation } from "./housing-location";
import { HousingService } from "./housing.service";

@Injectable({
    providedIn: 'root'
  })
export class SearchService{

    housingService = inject(HousingService)
    housingLocationList:HousingLocation[] = []

    constructor() {
        this.housingService.getAllHousingLocations().then(housingLocationList => this.housingLocationList = housingLocationList)
    }

    search(name?: string, city?:string, state?:string, availableUnits?:number, wifi?:boolean | null, laundry?:boolean | null) {
        // console.log(`name: ${name}, city: ${city}, state: ${state}, availableUnits: ${availableUnits}, wifi: ${wifi}, laundry: ${laundry}`)
        let found = this.housingLocationList
        .filter(housingLocation => housingLocation.name.toLowerCase().includes(name?.toLowerCase() ?? ""))
        .filter(housingLocation => housingLocation.city.toLowerCase().includes(city?.toLowerCase() ?? ''))
        .filter(housingLocation => housingLocation.state.toLowerCase().includes(state?.toLowerCase() ?? ''))
        .filter(housingLocation => housingLocation.availableUnits >= (availableUnits ?? 0))

        if((wifi !== null) && (wifi !== undefined)) {
            found = found.filter(housingLocation => housingLocation.wifi == wifi)
        }

        if(laundry !== null && laundry !== undefined) {
            found = found.filter(housingLocation => housingLocation.laundry == laundry)
        }
        return found
    }

}