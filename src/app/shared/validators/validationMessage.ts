import { FormGroup } from "@angular/forms";
import { IValidationMessage } from "../models/validationMessage";

const validationMessages: IValidationMessage[] = [
    {error: 'required', formControlName: ['email'], message: 'Please enter your email'},
    {error: 'pattern', formControlName: ['email'], message: 'Please enter a valid email address'},
    {error: 'unauthorised', formControlName: ['email'], message: 'Authentication was falied! Please try again'},
    {error: 'emailExists', formControlName: ['email'], message: 'This email is already taken'},
    {error: 'required', formControlName: ['password'], message: 'Please enter account password'},
    {error: 'required', formControlName: ['displayName'], message: 'Please enter display name'},
    {error: 'required', formControlName: ['newPassword'], message: 'Please create a password'},
    {error: 'pattern', formControlName: ['newPassword'], message: 'Please select a strong password'},
    {error:'required', formControlName: ['passwordConfirm'], message: 'Please enter password confirm'},
    {error:'password_mismatch', formControlName: ['passwordConfirm'], message: 'Password did not match'}
];

export function validationMessage (formControlName: string, formGroup: FormGroup): string {
    if(formGroup && formGroup.get(formControlName)){
        for(let error of validationMessages){
            if(!error.formControlName || error.formControlName.length === 0 || error.formControlName.includes(formControlName)
                && formGroup.get(formControlName).hasError(error.error)
            ){
                return error.message;
            }
        }
    }
    return '';
}