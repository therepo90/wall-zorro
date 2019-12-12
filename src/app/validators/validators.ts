import { Validators } from '@angular/forms';

export class CustomValidators {
    static oneSmallLetterAtLeast = Validators.pattern(/[a-z]+/);
    static oneCapitalLetterAtLeast = Validators.pattern(/[A-Z]+/);
    static oneNumberAtLeast = Validators.pattern(/\d+/);
    static loginPassword = Validators.compose([
        Validators.minLength(8),
        CustomValidators.oneSmallLetterAtLeast,
        CustomValidators.oneCapitalLetterAtLeast,
        CustomValidators.oneNumberAtLeast,
    ]);
}
