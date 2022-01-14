import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { IAddress } from '../shared/models/address';
import { CheckoutAddressFormGroupHelper } from './form-groups/checkoutAddressFormGroupHelper';
import { CheckoutFormGroupHelper } from './form-groups/checkoutFormGroupHelper';

@Component({
  selector: 'skinet-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.checkoutForm = CheckoutFormGroupHelper.createCheckoutFormGroup();
    this.populateUserAddress();
  }

  populateUserAddress(): void{
    this.accountService.getUserAddress().subscribe({
      next: (address: IAddress) => {
        if(address){
          this.checkoutForm.get('addressFormGroup').patchValue(address); 
        }
      },
      error: (error: any) => console.log(error)
    });
  }

}
