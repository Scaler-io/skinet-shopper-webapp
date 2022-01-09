import { FormGroup } from "@angular/forms";

export class AccountFormGroupHelper{
    public static applyUnauthorisedBackendError(formGroup:FormGroup, control: string, apply: boolean){
        if(!apply){
            formGroup.get(control).setErrors(null);
        }else{
            formGroup.get(control).setErrors({unauthorised: true})
        }
        
        return formGroup;
    }
}