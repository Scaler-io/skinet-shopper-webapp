import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IAddress } from 'src/app/shared/models/address';
import { CheckoutFormGroupHelper } from '../form-groups/checkoutFormGroupHelper';

@Component({
  selector: 'skinet-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  get addressFormGroup(): FormGroup {
    return  CheckoutFormGroupHelper.GetChildForm(this.checkoutForm, 'addressFormGroup');
  }

  saveAddressAsDefault(): void {
    this.accountService.updateUserAddress(
      this.checkoutForm.get('addressFormGroup').value
    ).subscribe({
      next: (address: IAddress) => {
        this.toastr.success('Address saved');
        this.checkoutForm.get('addressFormGroup').reset(address);
      },
      error: (error: any) => console.log(error)
    });
  }

}
