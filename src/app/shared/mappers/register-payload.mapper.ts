import { FormGroup } from "@angular/forms";
import { IRegisterPayload } from "../models/userRegisterPayload";

export class UserRegisterPayloadMapper  {
    public static map(form: FormGroup): IRegisterPayload {
        const emailValue = form?.get('email')?.value;
        const displayNameValue = form?.get('displayName')?.value;
        const passwordValue = form?.get('newPassword')?.value;

        return {
            email: emailValue,
            displayName: displayNameValue,
            password: passwordValue
        }
    }
}