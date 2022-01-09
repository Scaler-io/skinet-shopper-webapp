import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { empty, map, of, switchMap, timer } from "rxjs";
import { AccountService } from "src/app/account/account.service";

export function ValidateEmail(control: AbstractControl): { [key: string]: boolean } | null {
    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    if(!pattern.test(control.value)){
        return {'pattern': true }
    }

    return null;
}

export function DuplicateEmail(accountService: AccountService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return timer(500).pipe(
            switchMap(() => {
                if(!control.value)
                    return of(null);
                    return accountService.checkEmailExists(control.value).pipe(
                    map(res => {
                        return res ? {emailExists: true} : null;
                    })
                )
            })
        );
    }
}