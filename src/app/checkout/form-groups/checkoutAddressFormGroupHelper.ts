import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IAddress } from "src/app/shared/models/address";

export class CheckoutAddressFormGroupHelper {
    private static fb: FormBuilder = new FormBuilder();
    public static checkoutAddressFormgroup: FormGroup;

    public static createCheckoutAddressForm(): FormGroup {
        this.checkoutAddressFormgroup = this.fb.group({
            'firstName' : [null, Validators.required],
            'lastName' : [null, Validators.required],
            'street' : [null, Validators.required],
            'city' : [null, Validators.required],
            'state' : [null, Validators.required],
            'zipCode' : [null, Validators.required],
        });

        return this.checkoutAddressFormgroup;
    }

}