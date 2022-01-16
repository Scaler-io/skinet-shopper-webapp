import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class CheckoutDeliveryFormGroupHelper{
    private static fb: FormBuilder = new FormBuilder();
    public static checkoutDeliveryFormGroup: FormGroup;
    
    public static createCheckoutDeliveryFormGroup(): FormGroup {
        this.checkoutDeliveryFormGroup = this.fb.group({
            'deliveryMethod': [null, Validators.required]
        });

        return this.checkoutDeliveryFormGroup;
    }
}