import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutFormGroupHelper } from '../form-groups/checkoutFormGroupHelper';

@Component({
  selector: 'skinet-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    
  }

  get addressFormGroup(): FormGroup {
    return  CheckoutFormGroupHelper.GetChildForm(this.checkoutForm, 'addressFormGroup');
  }

}
