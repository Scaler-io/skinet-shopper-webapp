import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CheckoutAddressFormGroupHelper } from "./checkoutAddressFormGroupHelper";
import { CheckoutDeliveryFormGroupHelper } from "./checkoutDeliveryFormGroupHelper";
import { CheckoutPaymentFormGroup } from "./checkoutPaymentFormGroup";

export class CheckoutFormGroupHelper {
    private static fb: FormBuilder = new FormBuilder();
    public static checkoutFormGroup: FormGroup;
    
    public static createCheckoutFormGroup(): FormGroup {
        this.checkoutFormGroup = this.fb.group({
            addressFormGroup : CheckoutAddressFormGroupHelper.createCheckoutAddressForm(),
            deliveryFormGroup: CheckoutDeliveryFormGroupHelper.createCheckoutDeliveryFormGroup(),
            paymentFormGroup: CheckoutPaymentFormGroup.createCheckoutPaymentFormGroup()
        });

        return this.checkoutFormGroup;
    }

    public static GetChildForm(parent: FormGroup, child: string): FormGroup {
        return <FormGroup> parent?.get(child);
    } 
}