import { FormGroup } from "@angular/forms";

const validationMessages = [
    {error: 'required', formControlName: ['email'], message: 'Please enter a valid email'},
    {error: 'pattern', formControlName: ['email'], message: 'Please enter a valid email address'},
    {error: 'required', formControlName: ['password'], message: 'Please enter account password'},
];

export const validationMessage = (formControlName: string, formGroup: FormGroup): string => {
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