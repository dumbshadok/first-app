import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  url = "http://localhost:3000/locations"; 

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url)
    return await data.json() ?? []
    }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`)
    return await data.json() ?? {}
  }

  submitApplication(firstname: string, lastname: string, email: string) {
    console.log(
      `Homes application recieved firstname: ${firstname}, lastname: ${lastname}, email: ${email}`
    )
  }
}
