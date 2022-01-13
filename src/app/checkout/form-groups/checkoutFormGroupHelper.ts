import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CheckoutAddressFormGroupHelper } from "./checkoutAddressFormGroupHelper";
import { CheckoutDeliveryFormGroupHelper } from "./checkoutDeliveryFormGroupHelper";
import { CheckoutPaymentFormGroup } from "./checkoutPaymentFormGroup";

export class CheckoutFormGroupHelper {
    private static fb: FormBuilder = new FormBuilder();
    public static checkoutFormGroup: FormGroup;
    
    public static createCheckoutPaymentFormGroup(): FormGroup {
        this.checkoutFormGroup = this.fb.group({
            addressFormGroup : CheckoutAddressFormGroupHelper.createCheckoutAddressForm(),
            deliveryFormGroup: CheckoutDeliveryFormGroupHelper.createCheckoutDeliveryFormGroup(),
            paymentFormGroup: CheckoutPaymentFormGroup.createCheckoutPaymentFormGroup()
        });

        return this.checkoutFormGroup;
    }
}