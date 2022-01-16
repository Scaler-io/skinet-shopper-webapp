import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class CheckoutPaymentFormGroup {
    private static fb: FormBuilder = new FormBuilder();
    public static checkoutPaymentFormGroup: FormGroup;
    
    public static createCheckoutPaymentFormGroup(): FormGroup {
        this.checkoutPaymentFormGroup = this.fb.group({
            'nameOnCard': [null, Validators.required]
        });

        return this.checkoutPaymentFormGroup;
    }
}