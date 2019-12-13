import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder } from '@angular/forms';

describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>;
    beforeEach(() => {
        const authServiceStub: Partial<AuthService> = {};
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [LoginComponent],
            providers: [
                FormBuilder,
                { provide: AuthService, useValue: authServiceStub },
            ],
        });
        fixture = TestBed.createComponent(LoginComponent);
    });
    it('should be present', () => {
        const component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    it('should not allow too short username', () => {
        const component = fixture.componentInstance;
        component.ngOnInit();
        component.form.get('userName').setValue('abc');
        expect(component.form.valid).toBeFalsy();
    });

    it('should not allow too short password', () => {
        const component = fixture.componentInstance;
        component.ngOnInit();
        component.form.get('password').setValue('abc');
        expect(component.form.valid).toBeFalsy();
    });
    it('should not allow for no capital letters ', () => {
        const component = fixture.componentInstance;
        component.ngOnInit();
        component.form.get('password').setValue('abcgsgsdgdsags');
        expect(component.form.valid).toBeFalsy();
    });

    it('should not allow for no small letters', () => {
        const component = fixture.componentInstance;
        component.ngOnInit();
        component.form.get('password').setValue('ABCGSGSDGDSAGS');
        expect(component.form.valid).toBeFalsy();
    });
    it('should allow for proper username and password', () => {
        const component = fixture.componentInstance;
        component.ngOnInit();
        component.form.get('userName').setValue('FancyUsername');
        component.form.get('password').setValue('Hello1234');
        expect(component.form.valid).toBeTruthy();
    });
});
