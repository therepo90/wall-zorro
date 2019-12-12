import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../validators/validators';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading: boolean;
    submitForm(): void {}

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            userName: [null, [Validators.required, Validators.minLength(5)]],
            password: [
                null,
                [Validators.required, CustomValidators.loginPassword],
            ],
        });
    }

    login() {
        this.loading = true;
        this.authService
            .login(
                this.form.get('userName').value,
                this.form.get('password').value
            )
            .finally(() => {
                this.loading = false;
                this.cd.markForCheck();
            });
    }
}
