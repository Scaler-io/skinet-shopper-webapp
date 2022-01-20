import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IAddress } from '../shared/models/address';
import { CheckoutFormGroupHelper } from './form-groups/checkoutFormGroupHelper';

@Component({
  selector: 'skinet-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private accountService: AccountService,
    private basketService: BasketService) { }

  ngOnInit(): void {
    this.checkoutForm = CheckoutFormGroupHelper.createCheckoutFormGroup();
    this.populateUserAddress();
    this.populateDeliveryMethodValue();
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

  populateDeliveryMethodValue(){
    const basket = this.basketService.getCurrentBasketValue();
    if(basket?.deliveryMethodId !== null) {
      this.checkoutForm.get('deliveryFormGroup').get('deliveryMethod')
        .patchValue(basket?.deliveryMethodId?.toString());
    }
  }
}
