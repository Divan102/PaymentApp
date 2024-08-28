import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentDetailsComponent } from "./payment-details/payment-details.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaymentDetailsComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  constructor(private http: HttpClient) {
    
  }
  title = 'PaymentApp';
}
