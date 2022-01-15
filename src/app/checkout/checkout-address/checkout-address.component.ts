import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
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
      next: () => this.toastr.success('Address saved'),
      error: (error: any) => this.toastr.error(error.message)
    });
  }

}