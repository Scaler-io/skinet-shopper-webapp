import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class CheckoutAddressFormGroupHelper {
    private static fb: FormBuilder = new FormBuilder();
    public static checkoutAddressFormgroup: FormGroup;

    public static createCheckoutAddressForm(): FormGroup {
        this.checkoutAddressFormgroup = this.fb.group({
            'firsName' : [null, Validators.required],
            'lastName' : [null, Validators.required],
            'street' : [null, Validators.required],
            'city' : [null, Validators.required],
            'state' : [null, Validators.required],
            'zipCode' : [null, Validators.required],
        });

        return this.checkoutAddressFormgroup;
    }
}