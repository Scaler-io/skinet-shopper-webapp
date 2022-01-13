import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutFormGroupHelper } from './form-groups/checkoutFormGroupHelper';

@Component({
  selector: 'skinet-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.checkoutForm = CheckoutFormGroupHelper.createCheckoutFormGroup();
  }

}
