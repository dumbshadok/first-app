import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
  <section>
    <form action="">
      <input type="text" placeholder="Filter by city">
      <button class="primary" type="button">Search</button>
    </form>
  </section>
  `,
  styleUrls: [`./home.component.css`],
})
export class HomeComponent {

}
