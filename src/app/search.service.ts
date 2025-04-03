import { inject, Injectable } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { HousingLocation } from "./housing-location";
import { HousingService } from "./housing.service";

@Injectable(
    {providedIn: "root"}
)

export class SearchService{

    housingService = inject(HousingService)
    housingLocationList:HousingLocation[] = []

    constructor() {
        this.housingService.getAllHousingLocations().then(housingLocationList => this.housingLocationList = housingLocationList)
    }


    search(name?: string, city?:string, state?:string, availableUnits?:number, wifi?:boolean, laundry?:boolean) {
        console.log(name, city, state, availableUnits, wifi, laundry)
        const found = this.housingLocationList
        .filter(housingLocation => housingLocation.name.toLowerCase() == (name?.toLowerCase() ?? ''))
        .filter(housingLocation => housingLocation.city.toLowerCase() == (city?.toLowerCase() ?? ''))
        .filter(housingLocation => housingLocation.state.toLowerCase() == (state?.toLowerCase() ?? ''))
        .filter(housingLocation => housingLocation.availableUnits >= (availableUnits ?? 0))
        .filter(housingLocation => housingLocation.wifi == (wifi ?? (true || false)))
        .filter(housingLocation => housingLocation.laundry ==  (wifi ?? (true || false)))
        console.log(found)
        return found
    }

}