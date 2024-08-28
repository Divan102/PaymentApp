import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment-detail-form.component.html',
  styles: ``
})
export class PaymentDetailFormComponent {
  constructor(public service: PaymentDetailService, private toastr: ToastrService) {
  }

  onSubmit(form: NgForm): void {
    this.service.formSubmitted = true;
  
    if (form.valid) {
      if (this.service.formData.paymentDetailId === 0) {
        this.insertRecord(form);
      } else {
        this.updateRecord(form);
      }
    } else {
      this.toastr.error('Please fill out the form correctly before submitting', 'Validation Error');
    }
  }

    insertRecord(form: NgForm) {
      this.service.postPaymentDetail().subscribe({
        next:res=> {
          this.service.refreshList();
          this.toastr.success('Inserted successfully','Payment Detail Register')
        },
        error: err => { console.log(err) }
      })
    }
    updateRecord(form: NgForm) {
      this.service.putPaymentDetail().subscribe({
        next:res=> {
          this.service.refreshList();
          this.toastr.info('Updated successfully','Payment Detail Register')
        },
        error: err => { console.log(err) }
      })
    }

    formatExpirationDate(event: Event): void {
      const input = event.target as HTMLInputElement;
      let value = input.value.replace(/\D/g, ''); 
    
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2); 
      }
      
      input.value = value; 
      this.service.formData.expirationDate = value; 
    }

    restrictToNumbers(event: Event): void {
      const input = event.target as HTMLInputElement;
      input.value = input.value.replace(/\D/g, ''); 
    }

}
